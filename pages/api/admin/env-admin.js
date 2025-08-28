export default function handler(req, res) {
  const required = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY || ''
  }

  const info = Object.fromEntries(
    Object.entries(required).map(([k, v]) => [k, {
      set: Boolean(v),
      length: v.length,
      startsOrEndsWhitespace: v.length > 0 && (v[0] === ' ' || v[v.length - 1] === ' '),
      preview: v ? `${v.slice(0, 8)}…${v.slice(-6)}` : ''
    }])
  )

  res.status(200).json({
    success: true,
    environment: process.env.NODE_ENV,
    exactVarsUsedByAdmin: info,
    note: 'These are the exact variable names the admin API requires; no fallbacks are applied here.'
  })
}

