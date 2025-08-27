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

// GET - Get company information (admin)
export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    const authCookie = req.cookies.get('admin_auth')?.value
    if (authCookie !== '1') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getSupabase()
    const { data: company, error } = await supabase
      .from('company')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
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
    console.error('Admin company GET error:', error)
    const message = (error instanceof Error && error.message) ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

// PUT - Update company information (admin)
export async function PUT(req: NextRequest) {
  try {
    // Check admin authentication
    const authCookie = req.cookies.get('admin_auth')?.value
    if (authCookie !== '1') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { 
      name, 
      description, 
      email, 
      phone, 
      address, 
      website, 
      founded, 
      employees, 
      industry 
    } = body

    // Validation
    if (!name || !description || !email) {
      return NextResponse.json({ error: 'Name, description, and email are required' }, { status: 400 })
    }

    // Check if company record exists
    const supabase = getSupabase()
    const { data: existingCompany } = await supabase
      .from('company')
      .select('id')
      .single()

    let result
    if (existingCompany) {
      // Update existing record
      result = await supabase
        .from('company')
        .update({
          name,
          description,
          email,
          phone,
          address,
          website,
          founded,
          employees,
          industry,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingCompany.id)
        .select()
        .single()
    } else {
      // Create new record
      result = await supabase
        .from('company')
        .insert({
          name,
          description,
          email,
          phone,
          address,
          website,
          founded,
          employees,
          industry
        })
        .select()
        .single()
    }

    if (result.error) {
      throw new Error('Failed to update company information')
    }

    return NextResponse.json({
      success: true,
      message: 'Company information updated successfully',
      company: result.data
    })
  } catch (error) {
    console.error('Admin company PUT error:', error)
    const message = (error instanceof Error && error.message) ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}