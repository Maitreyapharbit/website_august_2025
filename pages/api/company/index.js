import { supabase } from '../_utils/supabase.js';
import { verifyToken } from '../_utils/auth.js';
import { verifyToken } from '../_utils/auth.js';

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
    if (req.method === 'GET') {
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

    if (req.method === 'PUT') {
      // Protected endpoint - update company information
      const authResult = verifyToken(req, res);
      if (authResult !== true) {
        return authResult;
      }

      const { name, description, email, phone, address } = req.body;

      const updateData = {};
      if (name) updateData.name = name;
      if (description) updateData.description = description;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (address) updateData.address = address;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'At least one field is required for update'
        });
      }

      const { data: company, error } = await supabase
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

    if (req.method === 'PUT') {
      // Protected endpoint - update company information
      const authResult = verifyToken(req, res);
      if (authResult !== true) {
        return authResult;
      }

      const { name, description, email, phone, address } = req.body;

      const updateData = {};
      if (name) updateData.name = name;
      if (description) updateData.description = description;
      if (email) updateData.email = email;
      if (phone) updateData.phone = phone;
      if (address) updateData.address = address;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          error: 'At least one field is required for update'
        });
      }

      const { data: company, error } = await supabase
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

    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`
    });

  } catch (error) {
    console.error('Company API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}