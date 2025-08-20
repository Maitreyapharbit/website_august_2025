import { supabase, supabaseAdmin } from '../_utils/supabase.js';
import { requireAuth } from '../_utils/authMiddleware.js';

// CORS headers for AWS Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export default function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET': {
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

        const { data: blogs, error, count } = await query
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
            blogs: blogs || [],
            total,
            page,
            limit,
            totalPages
          }
        });
      }

      case 'POST': {
        // Protected endpoint - create blog (admin only)
        try {
          requireAuth(req, ['ADMIN']);
        } catch (authError) {
          return res.status(401).json({
            success: false,
            error: authError.message
          });
        }

        const { title, excerpt, content, image_url, status = 'draft' } = req.body;

        // Validation
        if (!title || !excerpt || !content) {
          return res.status(400).json({
            success: false,
            error: 'Title, excerpt, and content are required'
          });
        }

        const { data: blog, error } = await supabaseAdmin
          .from('blogs')
          .insert({
            title,
            excerpt,
            content,
            image_url: image_url || null,
            status
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
      }

      default:
        return res.status(405).json({
          success: false,
          message: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('Blog API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}