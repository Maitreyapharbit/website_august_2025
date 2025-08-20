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
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
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
    const userProfile = {
      id: 1,
      username: 'admin',
      email: 'admin@techcorp.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'administrator',
      avatar: 'https://via.placeholder.com/150/0066CC/FFFFFF?text=AU',
      bio: 'System administrator and developer',
      location: 'San Francisco, CA',
      website: 'https://adminuser.dev',
      joinedAt: '2023-01-15T10:00:00Z',
      lastLogin: '2024-01-15T09:30:00Z',
      isActive: true,
      permissions: [
        'read:users',
        'write:users',
        'delete:users',
        'read:analytics',
        'write:content',
        'admin:system'
      ],
      preferences: {
        theme: 'light',
        language: 'en',
        timezone: 'America/Los_Angeles',
        notifications: {
          email: true,
          push: true,
          sms: false
        },
        dashboard: {
          layout: 'grid',
          widgets: ['analytics', 'recent-activity', 'quick-actions']
        }
      },
      stats: {
        loginCount: 247,
        postsCreated: 15,
        lastActivity: '2024-01-15T14:45:00Z'
      }
    };

    switch (req.method) {
      case 'GET':
        return res.status(200).json({
          success: true,
          data: userProfile
        });

      case 'PUT': {
        const updatedProfile = {
          ...userProfile,
          ...req.body,
          updatedAt: new Date().toISOString()
        };
        // Remove sensitive fields from update
        delete updatedProfile.id;
        delete updatedProfile.permissions;

        return res.status(200).json({
          success: true,
          message: 'Profile updated successfully',
          data: updatedProfile
        });
      }

      default:
        return res.status(405).json({
          success: false,
          message: `Method ${req.method} not allowed`
        });
    }
  } catch (error) {
    console.error('Profile API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}