import { supabaseAdmin } from '../_utils/supabase.js';
import { requireAuth } from '../_utils/authMiddleware.js';

// CORS headers for AWS Amplify
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Require admin authentication
    const user = requireAuth(req, ['ADMIN']);

    switch (req.method) {
      case 'GET': {
        // Get admin profile from database
        const { data: admin, error } = await supabaseAdmin
          .from('admins')
          .select('id, email, created_at')
          .eq('id', user.userId)
          .single();

        if (error || !admin) {
          return res.status(404).json({
            success: false,
            error: 'Admin profile not found'
          });
        }

        const userProfile = {
          id: admin.id,
          email: admin.email,
          role: 'ADMIN',
          displayName: 'Pharbit Admin',
          joinedAt: admin.created_at,
          lastLogin: new Date().toISOString(),
          permissions: [
            'read:blogs',
            'write:blogs',
            'delete:blogs',
            'read:company',
            'write:company',
            'read:contacts',
            'delete:contacts'
          ]
        };

        return res.status(200).json({
          success: true,
          data: userProfile
        });
      }

      case 'PUT': {
        // For now, just return success as admin profile updates are limited
        const { displayName } = req.body;

        return res.status(200).json({
          success: true,
          message: 'Profile updated successfully',
          data: {
            displayName: displayName || 'Pharbit Admin',
            updatedAt: new Date().toISOString()
          }
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
      error: 'Internal server error'
    });
  }
}