import { NextRequest, NextResponse } from 'next/server'
import { getSupabasePublic } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// GET - List all blogs (public)
export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabasePublic()
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
    console.error('Public blogs GET error:', error)
    const message = (error instanceof Error && error.message) ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}