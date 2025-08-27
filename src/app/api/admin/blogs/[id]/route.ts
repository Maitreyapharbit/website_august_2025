import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSupabaseEnv } from '@/lib/env'

function getSupabase() {
  const { url, serviceKey, anonKey } = getSupabaseEnv()
  if (!url) {
    throw new Error('Supabase URL is not configured')
  }
  
  // Use service key if available, otherwise fallback to anon key
  const key = serviceKey || anonKey
  if (!key) {
    throw new Error('Supabase environment variables are not configured')
  }
  
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  })
}

export const dynamic = 'force-dynamic'

// GET - Get single blog (admin)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check admin authentication
    const authCookie = req.cookies.get('admin_auth')?.value
    if (authCookie !== '1') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
      }
      throw new Error('Failed to fetch blog')
    }

    return NextResponse.json({
      success: true,
      blog
    })
  } catch (error) {
    console.error('Admin blog GET error:', error)
    const message = (error instanceof Error && error.message) ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT - Update blog (admin)
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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
      .update({
        title,
        excerpt,
        content,
        category,
        author,
        read_time,
        tags: tags || [],
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
      }
      throw new Error('Failed to update blog')
    }

    return NextResponse.json({
      success: true,
      message: 'Blog updated successfully',
      blog
    })
  } catch (error) {
    console.error('Admin blog PUT error:', error)
    const message = (error instanceof Error && error.message) ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// DELETE - Delete blog (admin)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check admin authentication
    const authCookie = req.cookies.get('admin_auth')?.value
    if (authCookie !== '1') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', params.id)

    if (error) {
      throw new Error('Failed to delete blog')
    }

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    console.error('Admin blog DELETE error:', error)
    const message = (error instanceof Error && error.message) ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}