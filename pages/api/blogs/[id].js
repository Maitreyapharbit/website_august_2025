import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

// Initialize Supabase clients
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
);

// CORS headers for Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
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

  const jwtSecret = process.env.JWT_SECRET;
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

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'Blog ID is required'
    });
  }

  try {
    if (req.method === 'GET') {
      // Public endpoint - get single blog
      const { data: blog, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !blog) {
        return res.status(404).json({
          success: false,
          error: 'Blog post not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Blog retrieved successfully',
        data: blog
      });

    } else if (req.method === 'PUT') {
      // Protected endpoint - update blog (admin only)
      try {
        authenticateToken(req);
      } catch (authError) {
        return res.status(401).json({
          success: false,
          error: authError.message
        });
      }

      const updates = req.body;
      
      // Add updated timestamp
      updates.updated_at = new Date().toISOString();

      const { data: blog, error } = await supabaseAdmin
        .from('blogs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error || !blog) {
        return res.status(404).json({
          success: false,
          error: 'Blog not found or update failed'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Blog updated successfully',
        data: blog
      });

    } else if (req.method === 'DELETE') {
      // Protected endpoint - delete blog (admin only)
      try {
        authenticateToken(req);
      } catch (authError) {
        return res.status(401).json({
          success: false,
          error: authError.message
        });
      }

      const { error } = await supabaseAdmin
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        return res.status(500).json({
          success: false,
          error: 'Failed to delete blog'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Blog deleted successfully'
      });

    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }

  } catch (error) {
    console.error('Blog API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}