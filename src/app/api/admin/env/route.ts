import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const vars = {
    NODE_ENV: process.env.NODE_ENV ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
    SUPABASE_URL: process.env.SUPABASE_URL ? 'SET' : 'NOT SET',
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? 'SET' : 'NOT SET',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ? 'SET' : 'NOT SET',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'SET' : 'NOT SET',
    ADMIN_LOCAL_EMAIL: process.env.ADMIN_LOCAL_EMAIL ? 'SET' : 'NOT SET',
    ADMIN_LOCAL_PASSWORD: process.env.ADMIN_LOCAL_PASSWORD ? 'SET' : 'NOT SET',
    ADMIN_BASIC_USER: process.env.ADMIN_BASIC_USER ? 'SET' : 'NOT SET',
    ADMIN_BASIC_PASSWORD: process.env.ADMIN_BASIC_PASSWORD ? 'SET' : 'NOT SET',
    PHARBIT_API_KEY: process.env.PHARBIT_API_KEY ? 'SET' : 'NOT SET',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET ? 'SET' : 'NOT SET',
  }

  return NextResponse.json({ success: true, vars })
}

