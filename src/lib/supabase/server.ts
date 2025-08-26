import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string

if (!supabaseUrl || !serviceRoleKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase server env not set: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY')
}

// Basic Supabase client for server-side operations
export const supabase = createClient(supabaseUrl ?? '', serviceRoleKey ?? '', {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

