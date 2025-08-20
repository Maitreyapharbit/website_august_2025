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

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const companyData = {
      id: 1,
      name: 'TechCorp Solutions',
      description: 'Leading technology solutions provider',
      industry: 'Technology',
      founded: '2020',
      headquarters: 'San Francisco, CA',
      employees: '50-100',
      website: 'https://techcorp.com',
      contact: {
        email: 'contact@techcorp.com',
        phone: '+1 (555) 123-4567',
        address: '123 Tech Street, San Francisco, CA 94105'
      },
      settings: {
        theme: 'light',
        notifications: true,
        autoSave: true,
        language: 'en',
        timezone: 'America/Los_Angeles'
      },
      social: {
        twitter: 'https://twitter.com/techcorp',
        linkedin: 'https://linkedin.com/company/techcorp',
        github: 'https://github.com/techcorp'
      }
    };

    switch (req.method) {
      case 'GET':
        return res.status(200).json({
          success: true,
          data: companyData
        });

      case 'PUT': {
        const updatedData = {
          ...companyData,
          ...req.body,
          updatedAt: new Date().toISOString()
        };

        return res.status(200).json({
          success: true,
          message: 'Company information updated successfully',
          data: updatedData
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
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}