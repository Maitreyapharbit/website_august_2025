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

  // Log incoming request
  console.log(`[${new Date().toISOString()}] ${req.method} /api/blogs`, {
    method: req.method,
    query: req.query,
    body: req.body
  });

  try {
    if (req.method === 'GET') {
      // Public endpoint - get all blogs
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const status = req.query.status;
      const search = req.query.search;

      let query = supabase
        .from('blogs')
        .select('*', { count: 'exact' });

      // Apply filters
      if (status) {
        query = query.eq('status', status);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
      }

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        console.error('Database error:', error);
        throw new Error('Failed to fetch blogs');
      }

      const total = count || 0;

      console.log(`Retrieved ${data?.length || 0} blogs, total: ${total}`);

      return res.status(200).json({
        success: true,
        blogs: data || [],
        count: total
      });

    } else if (req.method === 'POST') {
      // Protected endpoint - create blog (admin only)
      try {
        authenticateToken(req);
      } catch (authError) {
        return res.status(401).json({
          success: false,
          error: authError.message
        });
      }

      const { title, content, status, featured_image } = req.body;

      // Validation
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          error: 'Title and content are required'
        });
      }

      // Validate status if provided
      if (status && !['draft', 'published'].includes(status)) {
        return res.status(400).json({
          success: false,
          error: 'Status must be either "draft" or "published"'
        });
      }

      const blogData = {
        title,
        content,
        status: status || 'draft',
        featured_image: featured_image || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Creating blog with data:', blogData);

      const { data: blog, error } = await supabase
        .from('blogs')
        .insert(blogData)
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        throw new Error('Failed to create blog');
      }

      console.log('Blog created successfully:', blog.id);

      return res.status(201).json({
        success: true,
        blog: blog
      });

    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }

  } catch (error) {
    console.error('Blogs API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}