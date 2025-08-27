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

// GET - Get company information (public)
export async function GET(req: NextRequest) {
  try {
    const supabase = getSupabase()
    const { data: company, error } = await supabase
      .from('company')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Supabase fetch company error:', error)
      throw new Error('Failed to fetch company information')
    }

    // Return default company info if none exists
    const defaultCompany = {
      id: '1',
      name: 'Pharbit',
      description: 'Global pharmaceutical technology company combining blockchain and IoT sensors to create unbreakable chains of custody for medicines worldwide, ensuring transparency and patient safety.',
      email: 'info@pharbit.com',
      phone: '+4917697711873',
      address: 'An Europakanal 6, 91056 Erlangen, Germany',
      website: 'www.pharbit.com',
      founded: '2025',
      employees: '10-50',
      industry: 'Pharmaceutical Technology'
    }

    return NextResponse.json({
      success: true,
      company: company || defaultCompany
    })
  } catch (error) {
    console.error('Public company GET error:', error)
    const message = (error instanceof Error && error.message) ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}