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
  // Add CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  console.log(`=== BLOGS API - ${req.method} ===`);
  console.log('Request body:', req.body);
  console.log('Environment check:', {
    supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  });

  try {
    if (req.method === 'GET') {
      // For now, return empty blogs array to test API works
      return res.status(200).json({
        success: true,
        blogs: [],
        count: 0,
        message: 'Blogs API working - GET request successful'
      });
    }

    if (req.method === 'POST') {
      const { title, content, status, featured_image } = req.body;
      
      // Validate required fields
      if (!title || !content) {
        return res.status(400).json({
          success: false,
          error: 'Title and content are required',
          received: { title: !!title, content: !!content }
        });
      }

      // For now, just return success without database save
      const mockBlog = {
        id: Date.now(),
        title,
        content,
        status: status || 'draft',
        featured_image: featured_image || '',
        created_at: new Date().toISOString()
      };

      console.log('Mock blog created:', mockBlog);
      
      return res.status(200).json({
        success: true,
        blog: mockBlog,
        message: 'Blog created successfully! (Mock mode)'
      });
    }

    return res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} not allowed` 
    });

  } catch (error) {
    console.error('Blogs API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      details: 'Unexpected error in blogs API'
    });
  }
}