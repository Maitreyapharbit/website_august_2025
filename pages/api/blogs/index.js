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
        const blogs = [
          {
            id: 1,
            title: 'Getting Started with Next.js',
            excerpt: 'Learn how to build modern web applications',
            author: 'Admin User',
            publishedAt: '2024-01-15T10:00:00Z',
            status: 'published',
            tags: ['nextjs', 'tutorial']
          },
          {
            id: 2,
            title: 'Building RESTful APIs',
            excerpt: 'Complete guide to creating robust APIs',
            author: 'Admin User',
            publishedAt: '2024-01-10T15:30:00Z',
            status: 'draft',
            tags: ['api', 'backend']
          }
        ];

        return res.status(200).json({
          success: true,
          data: blogs,
          total: blogs.length,
          page: parseInt(req.query.page) || 1,
          limit: parseInt(req.query.limit) || 10
        });
      }

      case 'POST': {
        const { title, content, author, tags } = req.body || {};
        const newBlog = {
          id: Date.now(),
          title: title || 'Untitled Blog',
          content: content || '',
          author: author || 'Anonymous',
          publishedAt: new Date().toISOString(),
          status: 'draft',
          tags: tags || []
        };

        return res.status(201).json({
          success: true,
          message: 'Blog created successfully',
          data: newBlog
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
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}