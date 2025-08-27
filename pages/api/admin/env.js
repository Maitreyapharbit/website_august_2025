export default function handler(req, res) {
  // Debug: Log all environment variables to help troubleshoot
  console.log('Environment variables check:', {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
  })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
  const serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

  const redact = (val) => (val ? `${val.substring(0, 8)}…${val.substring(val.length - 6)}` : '')

  res.status(200).json({
    environment: process.env.NODE_ENV,
    hasUrl: Boolean(url),
    hasServiceKey: Boolean(serviceKey),
    hasAnonKey: Boolean(anonKey),
    urlPreview: redact(url),
    serviceKeyPreview: redact(serviceKey),
    anonKeyPreview: redact(anonKey),
    debug: {
      urlLength: url.length,
      serviceKeyLength: serviceKey.length,
      anonKeyLength: anonKey.length
    }
  })
}

