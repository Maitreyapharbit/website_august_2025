import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Bypass for login page and public assets
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/public/') ||
    pathname === '/admin/login'
  ) {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    const hasCookie = req.cookies.get('admin_auth')?.value === '1'
    if (!hasCookie) {
      const url = req.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}

