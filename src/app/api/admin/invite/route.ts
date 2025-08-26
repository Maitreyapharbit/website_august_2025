import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/server'

const ADMIN_INVITE_SECRET = process.env.ADMIN_INVITE_SECRET

export async function POST(req: NextRequest) {
  try {
    // Verify admin invite secret
    if (!ADMIN_INVITE_SECRET) {
      return NextResponse.json(
        { error: 'Admin invite secret not configured' },
        { status: 500 }
      )
    }

    const headerSecret = req.headers.get('x-admin-invite-secret')
    if (headerSecret !== ADMIN_INVITE_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { email } = await req.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Invite user via Supabase
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'User invited successfully',
      user: data.user
    })
  } catch (error) {
    console.error('Admin invite error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
