const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export default async function handler(req, res) {
  // CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  console.log('=== LOGIN API CALLED ===');
  console.log('Method:', req.method);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  console.log('Environment vars:', {
    hasSupabaseUrl: !!(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL),
    hasJwtSecret: !!process.env.JWT_ACCESS_SECRET,
    nodeEnv: process.env.NODE_ENV,
  });

  if (req.method !== 'POST') {
    console.log('❌ Wrong method:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body || {};

    console.log('Login attempt:', {
      email,
      hasPassword: !!password,
      passwordLength: password?.length,
    });

    const ADMIN_EMAIL = 'admin@pharbit.com';
    const ADMIN_PASSWORD = 'F#0341804279321';

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      console.log('✅ Hardcoded admin credentials matched');
      // Generate simple tokens that don't rely on env configuration
      const simpleToken = 'simple-admin-token-' + Date.now();
      const tokens = { access: simpleToken, refresh: simpleToken };
      console.log('✅ Sending success response with simple tokens');
      return res.status(200).json({
        success: true,
        message: 'Login successful (hardcoded admin)',
        data: {
          user: { id: 'demo-admin', email: ADMIN_EMAIL, role: 'ADMIN' },
          tokens,
        },
      });
    }

    console.log('❌ Credentials do not match:', {
      emailMatch: email === ADMIN_EMAIL,
      passwordMatch: password === ADMIN_PASSWORD,
      receivedEmail: email,
      receivedPassword: typeof password === 'string' ? password.substring(0, 3) + '...' : undefined,
    });

    return res.status(401).json({
      success: false,
      error: 'Invalid credentials',
      debug: {
        receivedEmail: email,
        expectedEmail: ADMIN_EMAIL,
        emailMatch: email === ADMIN_EMAIL,
        hasPassword: !!password,
      },
    });
  } catch (error) {
    console.error('❌ Login API error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
}