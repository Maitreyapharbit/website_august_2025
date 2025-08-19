import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

// Initialize Supabase clients
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// CORS headers for AWS Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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

  try {
    if (req.method === 'POST') {
      // Public endpoint - submit contact form
      const { name, email, message } = req.body;

      // Validation
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: 'Name, email, and message are required'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Invalid email format'
        });
      }

      const { data: contact, error } = await supabase
        .from('contacts')
        .insert({
          name,
          email,
          message,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        throw new Error('Failed to submit contact form');
      }

      return res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully. We will get back to you within 24 hours.',
        data: contact
      });

    } else if (req.method === 'GET') {
      // Protected endpoint - get all contacts (admin only)
      try {
        authenticateToken(req);
      } catch (authError) {
        return res.status(401).json({
          success: false,
          error: authError.message
        });
      }

      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      // Get total count
      const { count, error: countError } = await supabaseAdmin
        .from('contacts')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        throw new Error('Failed to get contact count');
      }

      // Get paginated contacts
      const { data: contacts, error } = await supabaseAdmin
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        throw new Error('Failed to fetch contacts');
      }

      const total = count || 0;
      const totalPages = Math.ceil(total / limit);

      return res.status(200).json({
        success: true,
        message: 'Contacts retrieved successfully',
        data: {
          contacts: contacts || [],
          total,
          page,
          limit,
          totalPages
        }
      });

    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }

  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}