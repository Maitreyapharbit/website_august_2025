// CORS headers for AWS Amplify / browsers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export default function handler(req, res) {
  try {
    Object.entries(corsHeaders).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    const nowIso = new Date().toISOString();
    console.log('Test API called:', nowIso);
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Query:', req.query);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Environment check:', {
      NODE_ENV: process.env.NODE_ENV,
      hasSupabaseUrl: !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL),
      hasJwtSecret: !!process.env.JWT_ACCESS_SECRET,
      supabaseUrl: (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '').substring(0, 20) + '...',
    });

    return res.status(200).json({
      message: 'API is working!',
      timestamp: nowIso,
      environment: process.env.NODE_ENV,
      method: req.method,
    });
  } catch (error) {
    console.error('Test API error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
}

