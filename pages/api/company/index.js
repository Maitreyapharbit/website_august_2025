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
  // Add CORS headers first
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  console.log(`=== COMPANY API - ${req.method} ===`);
  console.log('Request body:', req.body);

  try {
    if (req.method === 'GET') {
      // Return mock company data
      const mockCompany = {
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

      return res.status(200).json({
        success: true,
        company: mockCompany,
        message: 'Company info retrieved successfully (Mock mode)'
      });
    }

    if (req.method === 'PUT') {
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

      // Return updated mock company data
      const updatedCompany = {
        id: '1',
        company_name: company_name || 'Pharbit',
        address: address || 'An Europakanal 6, 91056 Erlangen, Germany',
        city: city || 'Erlangen',
        state: state || 'Bavaria',
        zip_code: zip_code || '91056',
        phone: phone || '+4917697711873',
        email: email || 'info@pharbit.com',
        website: website || 'https://pharbit.com'
      };

      console.log('Mock company updated:', updatedCompany);
      
      return res.status(200).json({
        success: true,
        company: updatedCompany,
        message: 'Company info updated successfully! (Mock mode)'
      });
    }

    return res.status(405).json({ 
      success: false, 
      error: `Method ${req.method} not allowed` 
    });

  } catch (error) {
    console.error('Company API Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      details: 'Unexpected error in company API'
    });
  }
}