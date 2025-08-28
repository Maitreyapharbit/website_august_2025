import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || ''

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })
}

export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabase()
    
    // Get all blogs with full details
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Debug connection error:', error)
      return NextResponse.json({ 
        error: 'Connection failed', 
        details: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'All blogs retrieved',
      blogsCount: blogs?.length || 0,
      blogs: blogs
    })
  } catch (error) {
    console.error('Debug endpoint error:', error)
    return NextResponse.json({ 
      error: 'Debug failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const blogId = searchParams.get('id')
    
    if (!blogId) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 })
    }

    console.log('=== DELETE DEBUG START ===')
    console.log('Blog ID to delete:', blogId)

    const supabase = getSupabase()
    
    // Step 1: Check if blog exists
    console.log('Step 1: Checking if blog exists...')
    const { data: existingBlog, error: checkError } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', blogId)
      .single()

    if (checkError) {
      console.error('Blog check error:', checkError)
      return NextResponse.json({ 
        error: 'Blog not found', 
        details: checkError.message,
        code: checkError.code
      }, { status: 404 })
    }

    console.log('Blog found:', existingBlog)

    // Step 2: Attempt delete
    console.log('Step 2: Attempting delete...')
    const { error: deleteError } = await supabase
      .from('blogs')
      .delete()
      .eq('id', blogId)

    if (deleteError) {
      console.error('Delete error:', deleteError)
      return NextResponse.json({ 
        error: 'Delete failed', 
        details: deleteError.message,
        code: deleteError.code
      }, { status: 500 })
    }

    console.log('Delete successful!')
    console.log('=== DELETE DEBUG END ===')

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
      deletedBlog: existingBlog
    })
  } catch (error) {
    console.error('Debug delete endpoint error:', error)
    return NextResponse.json({ 
      error: 'Debug delete failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { blogId } = body
    
    if (!blogId) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 })
    }

    console.log('=== POST DELETE DEBUG START ===')
    console.log('Blog ID to delete:', blogId)

    const supabase = getSupabase()
    
    // Step 1: Check if blog exists
    console.log('Step 1: Checking if blog exists...')
    const { data: existingBlog, error: checkError } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', blogId)
      .single()

    if (checkError) {
      console.error('Blog check error:', checkError)
      return NextResponse.json({ 
        error: 'Blog not found', 
        details: checkError.message,
        code: checkError.code
      }, { status: 404 })
    }

    console.log('Blog found:', existingBlog)

    // Step 2: Attempt delete
    console.log('Step 2: Attempting delete...')
    const { error: deleteError } = await supabase
      .from('blogs')
      .delete()
      .eq('id', blogId)

    if (deleteError) {
      console.error('Delete error:', deleteError)
      return NextResponse.json({ 
        error: 'Delete failed', 
        details: deleteError.message,
        code: deleteError.code
      }, { status: 500 })
    }

    console.log('Delete successful!')
    console.log('=== POST DELETE DEBUG END ===')

    return NextResponse.json({
      success: true,
      message: 'Blog deleted successfully',
      deletedBlog: existingBlog
    })
  } catch (error) {
    console.error('Debug delete endpoint error:', error)
    return NextResponse.json({ 
      error: 'Debug delete failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}