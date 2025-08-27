import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSupabaseEnv } from '@/lib/env'

function getSupabase() {
  const { url, serviceKey } = getSupabaseEnv()
  
  // Use fallback values if environment variables are not available
  const finalUrl = url || 'https://aowimurfdqzwqifhcuuk.supabase.co'
  const finalServiceKey = serviceKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvd2ltdXJmZHF6d3FpZmhjdXVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI0MTYxOSwiZXhwIjoyMDcwODE3NjE5fQ.udpmLjnuAuEPnM5kyPR1lPur7nZhx4NRe_svz4eoZdc'
  
  if (!finalUrl || !finalServiceKey) {
    console.error('Supabase env missing', {
      hasUrl: !!finalUrl,
      hasServiceKey: !!finalServiceKey
    })
    throw new Error('Supabase environment variables are not configured')
  }
  
  return createClient(finalUrl, finalServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })
}

export const dynamic = 'force-dynamic'

// GET - List all blogs (admin)
export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    const authCookie = req.cookies.get('admin_auth')?.value
    if (authCookie !== '1') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase fetch blogs error:', error)
      throw new Error('Failed to fetch blogs')
    }

    return NextResponse.json({
      success: true,
      blogs: blogs || []
    })
  } catch (error) {
    console.error('Admin blogs GET error:', error)
    const message = (error instanceof Error && error.message) ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// POST - Create new blog (admin)
export async function POST(req: NextRequest) {
  try {
    // Check admin authentication
    const authCookie = req.cookies.get('admin_auth')?.value
    if (authCookie !== '1') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, excerpt, content, category, author, read_time, tags } = body

    // Validation
    if (!title || !excerpt || !content || !category || !author || !read_time) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = getSupabase()
    const tagsArray = Array.isArray(tags)
      ? tags.filter((t: unknown) => typeof t === 'string' && t.trim().length > 0)
      : []

    const basePayload = {
      title,
      excerpt,
      content,
      category,
      author,
      read_time,
      date: new Date().toISOString()
    } as Record<string, unknown>

    // First try inserting with tags as array (for text[] columns)
    let insertResult = await supabase
      .from('blogs')
      .insert({
        ...basePayload,
        tags: tagsArray
      })
      .select()
      .single()

    // If type mismatch occurs (e.g., column is text not text[]), retry with string
    if (insertResult.error && /array|\[\]|text\[\]|invalid input value for enum|type mismatch/i.test(insertResult.error.message || '')) {
      console.warn('Retrying blog insert with string tags fallback:', insertResult.error)
      insertResult = await supabase
        .from('blogs')
        .insert({
          ...basePayload,
          // Store as comma-separated string fallback
          tags: tagsArray.join(', ')
        })
        .select()
        .single()
    }

    if (insertResult.error) {
      console.error('Supabase insert blog error:', insertResult.error)
      return NextResponse.json({
        error: `Failed to create blog: ${insertResult.error.message || 'Unknown error'}`
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Blog created successfully',
      blog: insertResult.data
    }, { status: 201 })
  } catch (error) {
    console.error('Admin blogs POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}