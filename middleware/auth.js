import { verifyToken } from '../lib/auth.js';

/**
 * Authentication middleware for API routes
 * @param {object} req - Request object
 * @returns {object} - Decoded user from token
 * @throws {Error} - If authentication fails
 */
export function requireAuth(req) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new Error('Access token required');
  }

  try {
    const decoded = verifyToken(token);
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Admin authorization middleware
 * @param {object} user - User object from token
 * @throws {Error} - If user is not admin
 */
export function requireAdmin(user) {
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }
}

/**
 * Wrapper for protected API routes
 * @param {function} handler - API route handler
 * @param {object} options - Options for auth requirements
 * @returns {function} - Protected handler
 */
export function withAuth(handler, options = { requireAdmin: false }) {
  return async (req, res) => {
    try {
      const user = requireAuth(req);
      
      if (options.requireAdmin) {
        requireAdmin(user);
      }
      
      // Add user to request object
      req.user = user;
      
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: error.message
      });
    }
  };
}