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
    
    // Test basic connection
    const { data: blogs, error } = await supabase
      .from('blogs')
      .select('id, title')
      .limit(5)

    if (error) {
      console.error('Test connection error:', error)
      return NextResponse.json({ 
        error: 'Connection failed', 
        details: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Connection successful',
      blogsCount: blogs?.length || 0,
      sampleBlogs: blogs
    })
  } catch (error) {
    console.error('Test endpoint error:', error)
    return NextResponse.json({ 
      error: 'Test failed', 
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

    console.log('Test delete for blog ID:', blogId)

    const supabase = getSupabase()
    
    // Test delete operation
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', blogId)

    if (error) {
      console.error('Test delete error:', error)
      return NextResponse.json({ 
        error: 'Delete failed', 
        details: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Test delete successful'
    })
  } catch (error) {
    console.error('Test delete endpoint error:', error)
    return NextResponse.json({ 
      error: 'Test delete failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}