import { NextRequest, NextResponse } from 'next/server'

function safeBtoa(input: string): string | null {
  try {
    // @ts-ignore
    if (typeof btoa === 'function') return btoa(input)
  } catch {}
  try {
    // @ts-ignore
    if (typeof Buffer !== 'undefined') return Buffer.from(input, 'utf8').toString('base64')
  } catch {}
  return null
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  const header = req.headers.get('authorization') || ''

  const user = process.env.ADMIN_BASIC_USER || process.env.ADMIN_LOCAL_EMAIL || 'admin@pharbit.com'
  const pass = process.env.ADMIN_BASIC_PASSWORD || process.env.ADMIN_LOCAL_PASSWORD || 'F#034180427932al'
  const precomputed = process.env.ADMIN_BASIC_AUTH_HEADER // optional env containing full "Basic base64"

  const expected = precomputed || (() => {
    const encoded = safeBtoa(`${user}:${pass}`)
    return encoded ? `Basic ${encoded}` : ''
  })()

  if (!expected || header !== expected) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin"' }
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}

