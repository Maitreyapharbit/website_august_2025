import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// GET - Get company information (admin)
export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    const authCookie = req.cookies.get('admin_auth')?.value
    if (authCookie !== '1') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getSupabaseAdmin()
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
    const supabase = getSupabaseAdmin()
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