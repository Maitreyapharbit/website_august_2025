// CORS headers for AWS Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export default async function handler(req, res) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    // Check environment variables
    const requiredEnvVars = [
      'SUPABASE_URL',
      'SUPABASE_ANON_KEY',
      'JWT_ACCESS_SECRET'
    ];

    const missingVars = requiredEnvVars.filter(varName => 
      !process.env[varName] && !process.env[`NEXT_PUBLIC_${varName}`]
    );

    const healthData = {
      success: true,
      message: 'Pharbit API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      services: {
        database: missingVars.length === 0 ? 'configured' : 'missing_config',
        api: 'healthy'
      },
      config: {
        supabaseConfigured: !!process.env.SUPABASE_URL || !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        jwtConfigured: !!process.env.JWT_ACCESS_SECRET,
        missingEnvVars: missingVars
      }
    };

    return res.status(200).json(healthData);

  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      success: false,
      error: 'Health check failed',
      timestamp: new Date().toISOString()
    });
  }
}