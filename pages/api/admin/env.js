export default function handler(req, res) {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || ''
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const redact = (val) => (val ? `${val.substring(0, 8)}…${val.substring(val.length - 6)}` : '')

  res.status(200).json({
    environment: process.env.NODE_ENV,
    hasUrl: Boolean(url),
    hasServiceKey: Boolean(serviceKey),
    hasAnonKey: Boolean(anonKey),
    urlPreview: redact(url),
    serviceKeyPreview: redact(serviceKey),
    anonKeyPreview: redact(anonKey)
  })
}

