import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    // Simple admin authentication
    const adminEmail = process.env.ADMIN_LOCAL_EMAIL || 'admin@pharbit.com'
    const adminPassword = process.env.ADMIN_LOCAL_PASSWORD || 'F#034180427932al'

    if (email === adminEmail && password === adminPassword) {
      const response = NextResponse.json({ 
        success: true, 
        message: 'Login successful' 
      })

      // Set admin authentication cookie
      response.cookies.set('admin_auth', '1', {
        httpOnly: false, // Allow JavaScript access
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 86400 // 24 hours
      })

      return response
    } else {
      return NextResponse.json({ 
        error: 'Invalid credentials' 
      }, { status: 401 })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ 
      error: 'Login failed' 
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Check if user is already authenticated
  const authCookie = req.cookies.get('admin_auth')?.value
  
  if (authCookie === '1') {
    return NextResponse.json({ 
      authenticated: true, 
      message: 'Already logged in' 
    })
  } else {
    return NextResponse.json({ 
      authenticated: false, 
      message: 'Not logged in' 
    })
  }
}