// Server-side env loader and helpers
// Ensures .env files are loaded in environments that don't auto-load them

// Note: avoid importing Node types as a module to keep TS happy in all envs

let hasConfigured = false

function ensureDotenvLoaded() {
  if (hasConfigured) return
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const dotenv = require('dotenv')
    // Try .env.local first, then fallback to .env
    dotenv.config({ path: '.env.local' })
    dotenv.config()
  } catch (_) {
    // ignore if dotenv not available
  }
  hasConfigured = true
}

export function getSupabaseEnv() {
  ensureDotenvLoaded()
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || ''
  return { url, anonKey, serviceKey }
}

export function sanitizePreview(value: string) {
  if (!value) return ''
  if (value.length <= 12) return '********'
  return `${value.slice(0, 8)}…${value.slice(-6)}`
}

