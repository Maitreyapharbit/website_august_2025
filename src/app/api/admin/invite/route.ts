import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

// Simple header-based guard to prevent public use. You can swap with auth session checks.
const ADMIN_INVITE_SECRET = process.env.ADMIN_INVITE_SECRET

export async function POST(req: NextRequest) {
  if (!ADMIN_INVITE_SECRET) {
    return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 })
  }
  const headerSecret = req.headers.get('x-admin-invite-secret')
  if (headerSecret !== ADMIN_INVITE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { email } = await req.json().catch(() => ({ email: null }))
  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email)
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
  return NextResponse.json({ user: data?.user ?? null })
}

