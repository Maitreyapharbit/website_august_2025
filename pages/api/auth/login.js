import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import { signTokens } from '../_utils/jwt';

// Initialize Supabase admin client lazily to avoid errors if envs are missing
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseKey);
}

// CORS headers for AWS Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
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

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const { email, password } = req.body || {};

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required'
      });
    }

    console.log('Login attempt:', { email, hasPassword: !!password });
    console.log('Environment check:', {
      hasSupabaseUrl: !!(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
      hasSupabaseKey: !!(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      hasJwtSecret: !!process.env.JWT_ACCESS_SECRET
    });

    // Hardcoded fallback admin (for bootstrap and demos)
    const demoEmail = 'admin@pharbit.com';
    const demoPassword = 'F#0341804279321';
    if (email === demoEmail && password === demoPassword) {
      const tokens = signTokens({ userId: 'demo-admin', email, role: 'ADMIN' });
      return res.status(200).json({
        success: true,
        message: 'Login successful (demo admin)',
        data: {
          user: { id: 'demo-admin', email, role: 'ADMIN' },
          tokens
        }
      });
    }

    // Database-backed auth if Supabase is configured
    const supabase = getSupabaseClient();
    if (!supabase) {
      return res.status(503).json({
        success: false,
        error: 'Database not configured and demo credentials did not match'
      });
    }

    // Try admins table first
    const { data: admin, error: adminErr } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single();

    if (adminErr || !admin) {
      console.log('Admin lookup failed, trying users table', { adminErr });
      const { data: user, error: userErr } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userErr || !user) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const isValidUserPassword = await bcrypt.compare(password, user.password_hash || '');
      if (!isValidUserPassword) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const tokens = signTokens({ userId: user.id, email: user.email, role: user.role || 'USER' });
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: { id: user.id, email: user.email, role: user.role || 'USER' },
          tokens
        }
      });
    }

    // Admin path (admins table)
    const isValidPassword = await bcrypt.compare(password, admin.password_hash || '');
    if (!isValidPassword) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const tokens = signTokens({ userId: admin.id, email: admin.email, role: 'ADMIN' });
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: { id: admin.id, email: admin.email, role: 'ADMIN' },
        tokens
      }
    });

  } catch (error) {
    console.error('Login API error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}