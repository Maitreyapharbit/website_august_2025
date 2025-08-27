import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) {
    throw new Error('Supabase environment variables are not configured')
  }
  return createClient(url, serviceKey, {
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
      throw new Error('Failed to fetch blogs')
    }

    return NextResponse.json({
      success: true,
      blogs: blogs || []
    })
  } catch (error) {
    console.error('Admin blogs GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
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
    const { data: blog, error } = await supabase
      .from('blogs')
      .insert({
        title,
        excerpt,
        content,
        category,
        author,
        read_time,
        tags: tags || [],
        date: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      throw new Error('Failed to create blog')
    }

    return NextResponse.json({
      success: true,
      message: 'Blog created successfully',
      blog
    }, { status: 201 })
  } catch (error) {
    console.error('Admin blogs POST error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}