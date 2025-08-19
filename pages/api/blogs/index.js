import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

// Initialize Supabase client
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

  try {
    if (req.method === 'GET') {
      // Public endpoint - get all blogs
      const page = parseInt(req.query.page) || 1;
      const limit = Math.min(parseInt(req.query.limit) || 10, 100);
      const category = req.query.category;
      const author = req.query.author;
      const search = req.query.search;

      let query = supabase
        .from('blogs')
        .select('*', { count: 'exact' });

      // Apply filters
      if (category) {
        query = query.eq('category', category);
      }

      if (author) {
        query = query.eq('author', author);
      }

      if (search) {
        query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
      }

      // Apply pagination
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        throw new Error('Failed to fetch blogs');
      }

      const total = count || 0;
      const totalPages = Math.ceil(total / limit);

      return res.status(200).json({
        success: true,
        message: 'Blogs retrieved successfully',
        data: {
          blogs: data || [],
          total,
          page,
          limit,
          totalPages
        }
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

      const { title, excerpt, content, read_time, category, author, tags } = req.body;

      // Validation
      if (!title || !excerpt || !content || !read_time || !category || !author) {
        return res.status(400).json({
          success: false,
          error: 'Missing required fields'
        });
      }

      const { data: blog, error } = await supabaseAdmin
        .from('blogs')
        .insert({
          title,
          excerpt,
          content,
          read_time,
          category,
          author,
          tags: tags || [],
          date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        throw new Error('Failed to create blog');
      }

      return res.status(201).json({
        success: true,
        message: 'Blog created successfully',
        data: blog
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