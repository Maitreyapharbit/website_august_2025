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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const stats = {
        overview: {
          totalUsers: 2847,
          activeUsers: 1653,
          newUsers: 284,
          userGrowth: 15.8,
          totalSessions: 5432,
          bounceRate: 28.5,
          averageSessionDuration: '5:42',
          pageViews: 18945,
          conversionRate: 4.2
        },
        traffic: {
          sources: {
            organic: 42.5,
            direct: 31.2,
            social: 16.8,
            referral: 6.3,
            email: 3.2
          },
          devices: {
            desktop: 58.4,
            mobile: 35.7,
            tablet: 5.9
          },
          browsers: {
            chrome: 67.3,
            safari: 18.9,
            firefox: 8.2,
            edge: 4.1,
            other: 1.5
          }
        },
        revenue: {
          total: 127450,
          monthly: 42500,
          weekly: 9800,
          daily: 1400,
          growth: 12.3,
          forecast: 145000
        },
        topPages: [
          { page: '/dashboard', views: 3240, percentage: 17.1, bounceRate: 22.5 },
          { page: '/products', views: 2890, percentage: 15.3, bounceRate: 31.2 },
          { page: '/analytics', views: 2156, percentage: 11.4, bounceRate: 18.9 },
          { page: '/settings', views: 1876, percentage: 9.9, bounceRate: 45.6 },
          { page: '/profile', views: 1432, percentage: 7.6, bounceRate: 38.2 }
        ],
        recentActivity: [
          { action: 'New user registration', timestamp: '2024-01-15T14:30:00Z', user: 'john@example.com' },
          { action: 'Purchase completed', timestamp: '2024-01-15T14:25:00Z', amount: 299 },
          { action: 'Blog post published', timestamp: '2024-01-15T14:20:00Z', title: 'API Best Practices' },
          { action: 'System backup completed', timestamp: '2024-01-15T14:00:00Z', status: 'success' }
        ],
        chartData: {
          daily: Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            users: Math.floor(Math.random() * 100) + 50,
            sessions: Math.floor(Math.random() * 150) + 75,
            pageViews: Math.floor(Math.random() * 300) + 200
          }))
        }
      };

      return res.status(200).json({
        success: true,
        data: stats,
        generatedAt: new Date().toISOString()
      });
    }

    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed`
    });
  } catch (error) {
    console.error('Analytics API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}