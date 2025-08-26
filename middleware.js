import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Get the pathname of the request
  const { pathname } = req.nextUrl

  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (pathname === '/admin/login') {
      return res
    }

    try {
      // Get the session
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        // No session, redirect to login
        const url = req.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
      }

      // Check if user has admin role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profileError || !profile) {
        // No profile found, redirect to login
        const url = req.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
      }

      // Check if user has admin role
      if (profile.role !== 'admin' && profile.role !== 'super_admin') {
        // Not an admin, redirect to login
        const url = req.nextUrl.clone()
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
      }

      // User is authenticated and has admin role, allow access
      return res

    } catch (error) {
      console.error('Middleware error:', error)
      // Error occurred, redirect to login
      const url = req.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  // For non-admin routes, just continue
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
