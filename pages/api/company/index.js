import { createClient } from '@supabase/supabase-js';

// CORS headers for AWS Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

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
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(500).json({
        success: false,
        error: 'Supabase environment variables are not configured.'
      });
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    if (req.method === 'GET') {
      // Public endpoint - get company information
      const { data: company, error } = await supabase
        .from('company')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw new Error('Failed to fetch company information');
      }

      // Return default company info if none exists
      const defaultCompany = {
        id: '1',
        name: 'Pharbit',
        description: 'Global pharmaceutical technology company combining blockchain and IoT sensors to create unbreakable chains of custody for medicines worldwide, ensuring transparency and patient safety.',
        email: 'info@pharbit.com',
        phone: '+4917697711873',
        address: 'An Europakanal 6, 91056 Erlangen, Germany',
        website: 'www.pharbit.com',
        founded: '2025',
        employees: '10-50',
        industry: 'Pharmaceutical Technology'
      };

      return res.status(200).json({
        success: true,
        message: 'Company information retrieved successfully',
        data: company || defaultCompany
      });
    }

    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });

  } catch (error) {
    console.error('Company API error:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Internal server error'
    });
  }
}