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

  // Log incoming request
  console.log(`[${new Date().toISOString()}] ${req.method} /api/company`, {
    method: req.method,
    body: req.body
  });

  try {
    if (req.method === 'GET') {
      // Public endpoint - get company information
      const { data: company, error } = await supabase
        .from('company_info')
        .select('*')
        .single();

      if (error || !company) {
        // Return default company info if not found
        const defaultCompany = {
          id: '1',
          company_name: 'Pharbit',
          address: 'An Europakanal 6, 91056 Erlangen, Germany',
          city: 'Erlangen',
          state: 'Bavaria',
          zip_code: '91056',
          phone: '+4917697711873',
          email: 'info@pharbit.com',
          website: 'https://pharbit.com'
        };

        console.log('No company info found, returning default');
        return res.status(200).json({
          success: true,
          company: defaultCompany
        });
      }

      console.log('Company info retrieved successfully');
      return res.status(200).json({
        success: true,
        company: company
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

      const { 
        company_name, 
        address, 
        city, 
        state, 
        zip_code, 
        phone, 
        email, 
        website 
      } = req.body;

      // Build update object with only provided fields
      const updates = {
        updated_at: new Date().toISOString()
      };
      
      if (company_name !== undefined) updates.company_name = company_name;
      if (address !== undefined) updates.address = address;
      if (city !== undefined) updates.city = city;
      if (state !== undefined) updates.state = state;
      if (zip_code !== undefined) updates.zip_code = zip_code;
      if (phone !== undefined) updates.phone = phone;
      if (email !== undefined) updates.email = email;
      if (website !== undefined) updates.website = website;

      // First, try to get existing company info
      const { data: existing } = await supabase
        .from('company_info')
        .select('*')
        .single();

      let company;
      
      if (existing) {
        // Update existing company info
        console.log('Updating existing company info');
        const { data: updatedCompany, error } = await supabase
          .from('company_info')
          .update(updates)
          .eq('id', existing.id)
          .select()
          .single();

        if (error) {
          console.error('Update error:', error);
          throw new Error('Failed to update company information');
        }
        company = updatedCompany;
      } else {
        // Create new company info record
        console.log('Creating new company info record');
        const newCompanyData = {
          company_name: company_name || 'Pharbit',
          address: address || 'An Europakanal 6, 91056 Erlangen, Germany',
          city: city || 'Erlangen',
          state: state || 'Bavaria',
          zip_code: zip_code || '91056',
          phone: phone || '+4917697711873',
          email: email || 'info@pharbit.com',
          website: website || 'https://pharbit.com',
          updated_at: new Date().toISOString()
        };

        const { data: newCompany, error } = await supabase
          .from('company_info')
          .insert(newCompanyData)
          .select()
          .single();

        if (error) {
          console.error('Create error:', error);
          throw new Error('Failed to create company information');
        }
        company = newCompany;
      }

      console.log('Company info updated successfully');
      return res.status(200).json({
        success: true,
        company: company
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