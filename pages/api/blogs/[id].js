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
  // Add CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { id } = req.query;

  console.log(`=== BLOG [${id}] API - ${req.method} ===`);
  console.log('Request body:', req.body);

  try {
    if (req.method === 'GET') {
      // Return mock blog data
      const mockBlog = {
        id: id,
        title: 'Sample Blog Post',
        content: 'This is a sample blog post content.',
        status: 'published',
        featured_image: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      return res.status(200).json({
        success: true,
        blog: mockBlog,
        message: 'Blog retrieved successfully (Mock mode)'
      });
    }

    if (req.method === 'PUT') {
      const { title, content, status, featured_image } = req.body;
      
      // Validate required fields
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          error: 'Title and content are required',
          received: { title: !!title, content: !!content }
        });
      }

      // Return updated mock blog
      const updatedBlog = {
        id: id,
        title,
        content,
        status: status || 'draft',
        featured_image: featured_image || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log('Mock blog updated:', updatedBlog);
      
      return res.status(200).json({
        success: true,
        blog: updatedBlog,
        message: 'Blog updated successfully! (Mock mode)'
      });
    }

    if (req.method === 'DELETE') {
      console.log(`Mock blog deleted: ${id}`);
      
      return res.status(200).json({
        success: true,
        message: 'Blog deleted successfully! (Mock mode)'
      });
    }

    return res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} not allowed` 
    });

  } catch (error) {
    console.error('Blog API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      details: 'Unexpected error in blog API'
    });
  }
}