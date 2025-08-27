import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const authCookie = req.cookies.get('admin_auth')?.value
  
  return NextResponse.json({
    authenticated: authCookie === '1',
    cookieValue: authCookie,
    message: authCookie === '1' ? 'Admin authenticated' : 'Not authenticated'
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { action } = body

    if (action === 'login') {
      const response = NextResponse.json({ 
        success: true, 
        message: 'Admin cookie set' 
      })

      // Set admin authentication cookie
      response.cookies.set('admin_auth', '1', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 86400
      })

      return response
    } else if (action === 'logout') {
      const response = NextResponse.json({ 
        success: true, 
        message: 'Admin cookie removed' 
      })

      // Remove admin authentication cookie
      response.cookies.set('admin_auth', '', {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0
      })

      return response
    } else {
      return NextResponse.json({ 
        error: 'Invalid action' 
      }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ 
      error: 'Action failed' 
    }, { status: 500 })
  }
}