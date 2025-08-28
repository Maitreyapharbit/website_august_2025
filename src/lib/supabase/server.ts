import { createClient, SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null = null
let cachedPublicClient: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (cachedClient) return cachedClient

  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) as string
  const serviceRoleKey = (
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY
  ) as string

  if (!supabaseUrl || !serviceRoleKey) {
    const diagnostics = {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!serviceRoleKey,
      checked: {
        NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        SUPABASE_URL: !!process.env.SUPABASE_URL,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_KEY,
      }
    }
    throw new Error(`Supabase admin environment variables are not set: ${JSON.stringify(diagnostics)}`)
  }

  cachedClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
  return cachedClient
}

export function getSupabasePublic(): SupabaseClient {
  if (cachedPublicClient) return cachedPublicClient

  const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL) as string
  const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY) as string

  if (!supabaseUrl || !anonKey) {
    throw new Error('Supabase public environment variables are not set')
  }

  cachedPublicClient = createClient(supabaseUrl, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
  return cachedPublicClient
}
