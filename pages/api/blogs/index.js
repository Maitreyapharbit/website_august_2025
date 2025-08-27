import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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

  try {
    if (req.method === 'GET') {
      // Public endpoint - get all blogs with pagination and filtering
      const { 
        page = 1, 
        limit = 10, 
        category, 
        author, 
        search 
      } = req.query;

      const pageNum = parseInt(page);
      const limitNum = Math.min(parseInt(limit), 100); // Max 100 items per page
      const offset = (pageNum - 1) * limitNum;

      let query = supabase
        .from('blogs')
        .select('*', { count: 'exact' })
        .order('date', { ascending: false });

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
      query = query.range(offset, offset + limitNum - 1);

      const { data: blogs, error, count } = await query;

      if (error) {
        throw new Error('Failed to fetch blogs');
      }

      const totalPages = Math.ceil((count || 0) / limitNum);

      return res.status(200).json({
        success: true,
        message: 'Blogs retrieved successfully',
        data: {
          blogs: blogs || [],
          total: count || 0,
          page: pageNum,
          limit: limitNum,
          totalPages
        }
      });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });

  } catch (error) {
    console.error('Blogs API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}