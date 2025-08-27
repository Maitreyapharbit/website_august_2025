import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  // Get environment variables with fallbacks
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
  let anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

  // Use fallback values if environment variables are not available
  if (!url) {
    url = 'https://aowimurfdqzwqifhcuuk.supabase.co'
  }
  if (!anonKey) {
    anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvd2ltdXJmZHF6d3FpZmhjdXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNDE2MTksImV4cCI6MjA3MDgxNzYxOX0.3wpCViQnItTeveumSylPqFtPJKso9QfPDxsX-44Icm0'
  }

  return createClient(url, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  })
}

export const dynamic = 'force-dynamic'

// GET - List all blogs (public)
export async function GET(req: NextRequest) {
  try {
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
    console.error('Public blogs GET error:', error)
    const message = (error instanceof Error && error.message) ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}