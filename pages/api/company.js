import { createClient } from '@supabase/supabase-js';
import jwt from 'jsonwebtoken';

// Initialize Supabase clients
const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// CORS headers for AWS Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
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
      // Public endpoint - get company information
      const { data: company, error } = await supabase
        .from('company')
        .select('*')
        .single();

      if (error || !company) {
        // Return default company info if not found
        const defaultCompany = {
          id: '1',
          name: 'Pharbit',
          description: 'Global pharmaceutical technology company combining blockchain and IoT sensors to create unbreakable chains of custody for medicines worldwide.',
          email: 'info@pharbit.com',
          phone: '+4917697711873',
          address: 'An Europakanal 6, 91056 Erlangen, Germany'
        };

        return res.status(200).json({
          success: true,
          message: 'Company information retrieved successfully',
          data: defaultCompany
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Company information retrieved successfully',
        data: company
      });

    } else if (req.method === 'PUT') {
      // Protected endpoint - update company information (admin only)
      try {
        authenticateToken(req);
      } catch (authError) {
        return res.status(401).json({
          success: false,
          error: authError.message
        });
      }

      const { name, description, email, phone, address } = req.body;

      // Build update object with only provided fields
      const updates = {
        updated_at: new Date().toISOString()
      };
      
      if (name !== undefined) updates.name = name;
      if (description !== undefined) updates.description = description;
      if (email !== undefined) updates.email = email;
      if (phone !== undefined) updates.phone = phone;
      if (address !== undefined) updates.address = address;

      // First, try to get existing company
      const { data: existing } = await supabaseAdmin
        .from('company')
        .select('*')
        .single();

      let company;
      
      if (existing) {
        // Update existing company
        const { data: updatedCompany, error } = await supabaseAdmin
          .from('company')
          .update(updates)
          .eq('id', existing.id)
          .select()
          .single();

        if (error) {
          throw new Error('Failed to update company information');
        }
        company = updatedCompany;
      } else {
        // Create new company record
        const { data: newCompany, error } = await supabaseAdmin
          .from('company')
          .insert({
            name: name || 'Pharbit',
            description: description || 'Global pharmaceutical technology company',
            email: email || 'info@pharbit.com',
            phone: phone || '+4917697711873',
            address: address || 'An Europakanal 6, 91056 Erlangen, Germany'
          })
          .select()
          .single();

        if (error) {
          throw new Error('Failed to create company information');
        }
        company = newCompany;
      }

      return res.status(200).json({
        success: true,
        message: 'Company information updated successfully',
        data: company
      });

    } else {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed'
      });
    }

  } catch (error) {
    console.error('Company API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}