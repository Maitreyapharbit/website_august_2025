#!/usr/bin/env node
/*
 Simple local CLI to manage blogs via Supabase Service Role key.
 Usage examples:
   node scripts/blog-cli.js list
   node scripts/blog-cli.js create --title "My Post" --excerpt "Summary" --content "Body" --category "News" --author "Admin" --read_time 3 --tags "tag1,tag2"
   node scripts/blog-cli.js update --id <uuid> --title "New Title"
   node scripts/blog-cli.js delete --id <uuid>
*/

import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

function getEnv(name, optional = false) {
  const value = process.env[name]
  if (!value && !optional) {
    console.error(`Missing required env: ${name}`)
    process.exit(1)
  }
  return value || ''
}

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY
  if (!url || !serviceKey) {
    console.error('Supabase admin env not set. Required: NEXT_PUBLIC_SUPABASE_URL (or SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY).')
    process.exit(1)
  }
  return createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })
}

function parseArgs(argv) {
  const args = {}
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i]
    if (token.startsWith('--')) {
      const key = token.slice(2)
      const next = argv[i + 1]
      if (next && !next.startsWith('--')) {
        args[key] = next
        i++
      } else {
        args[key] = 'true'
      }
    } else if (!args._) {
      args._ = [token]
    } else {
      args._.push(token)
    }
  }
  return args
}

function toTags(input) {
  if (!input) return []
  return input
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
}

async function listBlogs(supabase) {
  const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false })
  if (error) throw error
  console.log(JSON.stringify(data, null, 2))
}

async function createBlog(supabase, args) {
  const required = ['title', 'excerpt', 'content', 'category', 'author', 'read_time']
  for (const k of required) {
    if (!args[k]) {
      console.error(`Missing --${k}`)
      process.exit(1)
    }
  }
  const payload = {
    title: args.title,
    excerpt: args.excerpt,
    content: args.content,
    category: args.category,
    author: args.author,
    read_time: Number(args.read_time),
    date: new Date().toISOString(),
    tags: toTags(args.tags)
  }
  let result = await supabase.from('blogs').insert(payload).select().single()
  if (result.error) {
    // Fallback: store tags as string if array type mismatch
    const msg = result.error.message || ''
    if (/array|\[\]|text\[\]|type mismatch/i.test(msg)) {
      result = await supabase.from('blogs').insert({ ...payload, tags: toTags(args.tags).join(', ') }).select().single()
    }
  }
  if (result.error) throw result.error
  console.log('Created:', JSON.stringify(result.data, null, 2))
}

async function updateBlog(supabase, args) {
  if (!args.id) {
    console.error('Missing --id')
    process.exit(1)
  }
  const updatable = ['title', 'excerpt', 'content', 'category', 'author', 'read_time', 'tags']
  const update = {}
  for (const k of updatable) {
    if (args[k] !== undefined) {
      update[k] = k === 'tags' ? toTags(args[k]) : k === 'read_time' ? Number(args[k]) : args[k]
    }
  }
  if (Object.keys(update).length === 0) {
    console.error('Provide at least one field to update.')
    process.exit(1)
  }
  const { data, error } = await supabase.from('blogs').update(update).eq('id', args.id).select().single()
  if (error) throw error
  console.log('Updated:', JSON.stringify(data, null, 2))
}

async function deleteBlog(supabase, args) {
  if (!args.id) {
    console.error('Missing --id')
    process.exit(1)
  }
  const { error } = await supabase.from('blogs').delete().eq('id', args.id)
  if (error) throw error
  console.log('Deleted:', args.id)
}

async function main() {
  const argv = process.argv.slice(2)
  const cmd = argv[0]
  const args = parseArgs(argv.slice(1))
  const supabase = getSupabaseAdmin()

  try {
    if (cmd === 'list') {
      await listBlogs(supabase)
    } else if (cmd === 'create') {
      await createBlog(supabase, args)
    } else if (cmd === 'update') {
      await updateBlog(supabase, args)
    } else if (cmd === 'delete') {
      await deleteBlog(supabase, args)
    } else {
      console.log(`Unknown or missing command. Use one of: list | create | update | delete`)
      process.exit(2)
    }
  } catch (err) {
    console.error('Error:', err instanceof Error ? err.message : String(err))
    process.exit(1)
  }
}

main()

