import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => req.cookies.set(name, value))
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  // Get the pathname of the request
  const { pathname } = req.nextUrl

  // Check if the request is for admin routes
  if (pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (pathname === '/admin/login') {
      return response
    }

    try {
      // Get the session using cookies
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        // No authenticated user, redirect to login
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }

      // Check if user has admin role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profileError || !profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
        // User doesn't have admin role, redirect to login
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }

      // User is authenticated and has admin role, allow access
      return response
    } catch (error) {
      console.error('Middleware error:', error)
      // On error, redirect to login
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  // For non-admin routes, just continue
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}
