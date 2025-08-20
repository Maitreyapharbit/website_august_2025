import { supabase, supabaseAdmin } from '../_utils/supabase.js';
import { requireAuth } from '../_utils/authMiddleware.js';

// CORS headers for AWS Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET': {
        // Public endpoint - get company information
        const { data: company, error } = await supabase
          .from('company')
          .select('*')
          .single();

        if (error || !company) {
          return res.status(404).json({
            success: false,
            error: 'Company information not found'
          });
        }

        return res.status(200).json({
          success: true,
          message: 'Company information retrieved successfully',
          data: company
        });
      }

      case 'PUT': {
        // Protected endpoint - update company information (admin only)
        try {
          requireAuth(req, ['ADMIN']);
        } catch (authError) {
          return res.status(401).json({
            success: false,
            error: authError.message
          });
        }

        const updateData = {};
        const { name, description, email, phone, address } = req.body;

        // Only update provided fields
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (email !== undefined) updateData.email = email;
        if (phone !== undefined) updateData.phone = phone;
        if (address !== undefined) updateData.address = address;

        if (Object.keys(updateData).length === 0) {
          return res.status(400).json({
            success: false,
            error: 'No valid fields provided for update'
          });
        }

        const { data: company, error } = await supabaseAdmin
          .from('company')
          .update(updateData)
          .select()
          .single();

        if (error) {
          throw new Error('Failed to update company information');
        }

        return res.status(200).json({
          success: true,
          message: 'Company information updated successfully',
          data: company
        });
      }

      default:
        return res.status(405).json({
          success: false,
          message: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('Company API Error:', error);
    
    if (error.message === 'Authorization required' || error.message === 'Invalid or expired token') {
      return res.status(401).json({
        success: false,
        error: error.message
      });
    }
    
    if (error.message === 'Insufficient permissions') {
      return res.status(403).json({
        success: false,
        error: error.message
      });
    }
    
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}