import { supabase } from '../_utils/supabase.js';

// CORS headers for AWS Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export default async function handler(req, res) {
  // Add CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
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
    }

    return res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} not allowed` 
    });

  } catch (error) {
    console.error('Blog API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}