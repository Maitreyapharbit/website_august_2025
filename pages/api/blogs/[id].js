import { supabase } from '../_utils/supabase.js';
import { verifyToken } from '../_utils/auth.js';
import { verifyToken } from '../_utils/auth.js';

// CORS headers for AWS Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export default async function handler(req, res) {
  // Add CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
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

    if (req.method === 'PUT') {
      // Protected endpoint - update blog
      const authResult = verifyToken(req, res);
      if (authResult !== true) {
        return authResult;
      }

      const { title, excerpt, content, image_url } = req.body;

      const updateData = {};
      if (title) updateData.title = title;
      if (excerpt) updateData.excerpt = excerpt;
      if (content) updateData.content = content;
      if (image_url !== undefined) updateData.image_url = image_url;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'At least one field is required for update'
        });
      }

      const { data: blog, error } = await supabase
        .from('blogs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error || !blog) {
        return res.status(404).json({
          success: false,
          error: 'Blog post not found or update failed'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Blog updated successfully',
        data: blog
      });
    }

    if (req.method === 'DELETE') {
      // Protected endpoint - delete blog
      const authResult = verifyToken(req, res);
      if (authResult !== true) {
        return authResult;
      }

      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        return res.status(404).json({
          success: false,
          error: 'Blog post not found or delete failed'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Blog deleted successfully'
      });
    }

    if (req.method === 'PUT') {
      // Protected endpoint - update blog
      const authResult = verifyToken(req, res);
      if (authResult !== true) {
        return authResult;
      }

      const { title, excerpt, content, image_url } = req.body;

      const updateData = {};
      if (title) updateData.title = title;
      if (excerpt) updateData.excerpt = excerpt;
      if (content) updateData.content = content;
      if (image_url !== undefined) updateData.image_url = image_url;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'At least one field is required for update'
        });
      }

      const { data: blog, error } = await supabase
        .from('blogs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error || !blog) {
        return res.status(404).json({
          success: false,
          error: 'Blog post not found or update failed'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Blog updated successfully',
        data: blog
      });
    }

    if (req.method === 'DELETE') {
      // Protected endpoint - delete blog
      const authResult = verifyToken(req, res);
      if (authResult !== true) {
        return authResult;
      }

      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        return res.status(404).json({
          success: false,
          error: 'Blog post not found or delete failed'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Blog deleted successfully'
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