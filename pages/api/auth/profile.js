import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// CORS headers for AWS Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

// Authentication middleware
function authenticateToken(req) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new Error('Access token required');
  }

  const jwtSecret = process.env.JWT_ACCESS_SECRET;
  if (!jwtSecret) {
    throw new Error('Server configuration error');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Log incoming request
  console.log(`[${new Date().toISOString()}] ${req.method} /api/auth/profile`, {
    method: req.method
  });

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    // Protected endpoint - get user profile
    let user;
    try {
      user = authenticateToken(req);
    } catch (authError) {
      return res.status(401).json({
        success: false,
        error: authError.message
      });
    }

    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, created_at')
      .eq('id', user.userId)
      .single();

    if (error || !admin) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const profile = {
      id: admin.id,
      email: admin.email,
      first_name: 'Admin',
      last_name: 'User',
      role: 'ADMIN',
      created_at: admin.created_at
    };

    console.log('Profile retrieved successfully');

    return res.status(200).json({
      success: true,
      profile: profile
    });

  } catch (error) {
    console.error('Profile API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}