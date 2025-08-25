import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '../_utils/supabase.js';

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
    // Default admin credentials
    const adminEmail = 'admin@pharbit.com';
    const adminPassword = 'F#034180427932al';

    // Check if admin already exists
    const { data: existingAdmin } = await supabaseAdmin
      .from('admins')
      .select('id')
      .eq('email', adminEmail)
      .single();

    if (existingAdmin) {
      return res.status(200).json({
        success: true,
        message: 'Admin user already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(adminPassword, saltRounds);

    // Create admin user
    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .insert({
        email: adminEmail,
        password_hash: passwordHash
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: {
        id: admin.id,
        email: admin.email
      }
    });

  } catch (error) {
    console.error('Setup admin error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create admin user'
    });
  }
}