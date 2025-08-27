import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || ''
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const redact = (val: string) => (val ? `${val.substring(0, 8)}…${val.substring(val.length - 6)}` : '')

  return NextResponse.json({
    environment: process.env.NODE_ENV,
    hasUrl: Boolean(url),
    hasServiceKey: Boolean(serviceKey),
    hasAnonKey: Boolean(anonKey),
    urlPreview: redact(url),
    serviceKeyPreview: redact(serviceKey),
    anonKeyPreview: redact(anonKey)
  })
}

