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
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }

      // Check if user has admin role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single()

      if (profileError || !profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
        // User doesn't have admin role, redirect to login
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }

      // User is authenticated and has admin role, allow access
      return res
    } catch (error) {
      console.error('Middleware error:', error)
      // On error, redirect to login
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // For non-admin routes, just continue
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
