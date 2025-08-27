import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSupabaseEnv } from '@/lib/env'

function getSupabase() {
  // Get environment variables with fallbacks
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
  let serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

  // Use fallback values if environment variables are not available
  if (!url) {
    url = 'https://aowimurfdqzwqifhcuuk.supabase.co'
    console.log('Using hardcoded URL as fallback')
  }
  if (!serviceKey) {
    serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvd2ltdXJmZHF6d3FpZmhjdXVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI0MTYxOSwiZXhwIjoyMDcwODE3NjE5fQ.udpmLjnuAuEPnM5kyPR1lPur7nZhx4NRe_svz4eoZdc'
    console.log('Using hardcoded service key as fallback')
  }

  if (!url || !serviceKey) {
    console.error('Supabase env missing', {
      hasUrl: !!url,
      hasServiceKey: !!serviceKey
    })
    throw new Error('Supabase environment variables are not configured')
  }
  
  return createClient(url, serviceKey, {
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
    console.log('Auth cookie value:', authCookie)
    
    if (authCookie !== '1') {
      console.log('Authentication failed - cookie not found or invalid')
      return NextResponse.json({ error: 'Unauthorized - Please login as admin' }, { status: 401 })
    }

    console.log('Authentication successful, attempting to delete blog with ID:', params.id)

    const supabase = getSupabase()
    
    // First check if the blog exists
    const { data: existingBlog, error: checkError } = await supabase
      .from('blogs')
      .select('id, title')
      .eq('id', params.id)
      .single()

    if (checkError) {
      console.error('Blog check error:', checkError)
      if (checkError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
      }
      throw new Error(`Failed to check blog: ${checkError.message}`)
    }

    if (!existingBlog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }

    console.log('Blog found:', existingBlog.title)

    // Now delete the blog
    const { error: deleteError } = await supabase
      .from('blogs')
      .delete()
      .eq('id', params.id)

    if (deleteError) {
      console.error('Delete error:', deleteError)
      throw new Error(`Failed to delete blog: ${deleteError.message}`)
    }

    console.log('Blog deleted successfully:', params.id)

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
      deletedBlog: existingBlog
    })
  } catch (error) {
    console.error('Admin blog DELETE error:', error)
    const message = (error instanceof Error && error.message) ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}