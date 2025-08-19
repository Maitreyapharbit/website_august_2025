import jwt from 'jsonwebtoken';

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

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed'
    });
  }

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No token provided'
      });
    }

    const jwtSecret = process.env.JWT_ACCESS_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    const decoded = jwt.verify(token, jwtSecret);
    
    return res.status(200).json({
      success: true,
      message: 'Token is valid',
      data: { 
        valid: true,
        user: decoded 
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
}