export default function handler(req, res) {
  // Debug: Log all environment variables to help troubleshoot
  console.log('Environment variables check:', {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? 'SET' : 'NOT SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET',
    ALL_ENV_KEYS: Object.keys(process.env).filter(key => key.includes('SUPABASE'))
  })

  // Try to get values from environment variables first
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || ''
  let serviceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  let anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || ''

  // If environment variables are not working, use hardcoded values as fallback
  if (!url) {
    url = 'https://aowimurfdqzwqifhcuuk.supabase.co'
    console.log('Using hardcoded URL as fallback')
  }
  
  if (!serviceKey) {
    serviceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFvd2ltdXJmZHF6d3FpZmhjdXVrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTI0MTYxOSwiZXhwIjoyMDcwODE3NjE5fQ.udpmLjnuAuEPnM5kyPR1lPur7nZhx4NRe_svz4eoZdc'
    console.log('Using hardcoded service key as fallback')
  }

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
      anonKeyLength: anonKey.length,
      allSupabaseKeys: Object.keys(process.env).filter(key => key.includes('SUPABASE')),
      usingFallback: !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY
    }
  })
}

