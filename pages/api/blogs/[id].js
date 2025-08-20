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

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({
      success: false,
      error: 'Blog ID is required'
    });
  }

  // Log incoming request
  console.log(`[${new Date().toISOString()}] ${req.method} /api/blogs/${id}`, {
    method: req.method,
    id: id,
    body: req.body
  });

  try {
    if (req.method === 'GET') {
      // Public endpoint - get single blog
      const { data: blog, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !blog) {
        console.log(`Blog not found: ${id}`);
        return res.status(404).json({
          success: false,
          error: 'Blog post not found'
        });
      }

      console.log(`Blog retrieved: ${id}`);

      return res.status(200).json({
        success: true,
        blog: blog
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

      const { title, content, status, featured_image } = req.body;
      
      // Build update object with only provided fields
      const updates = {
        updated_at: new Date().toISOString()
      };
      
      if (title !== undefined) updates.title = title;
      if (content !== undefined) updates.content = content;
      if (status !== undefined) {
        if (!['draft', 'published'].includes(status)) {
          return res.status(400).json({
            success: false,
            error: 'Status must be either "draft" or "published"'
          });
        }
        updates.status = status;
      }
      if (featured_image !== undefined) updates.featured_image = featured_image;

      console.log(`Updating blog ${id} with:`, updates);

      const { data: blog, error } = await supabase
        .from('blogs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error || !blog) {
        console.error('Update error:', error);
        return res.status(404).json({
          success: false,
          error: 'Blog not found or update failed'
        });
      }

      console.log(`Blog updated successfully: ${id}`);

      return res.status(200).json({
        success: true,
        blog: blog
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

      console.log(`Deleting blog: ${id}`);

      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        return res.status(500).json({
          success: false,
          error: 'Failed to delete blog'
        });
      }

      console.log(`Blog deleted successfully: ${id}`);

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