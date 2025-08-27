import { createClient, SupabaseClient } from '@supabase/supabase-js'

let cachedClient: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (cachedClient) return cachedClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

  if (!supabaseUrl || !anonKey) {
    throw new Error('Supabase environment variables are not set')
  }

  cachedClient = createClient(supabaseUrl, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
  return cachedClient
}

