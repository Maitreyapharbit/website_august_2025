import { verifyToken } from './jwt.js';

/**
 * Require authentication and optionally check roles
 * @param {object} req - Request object
 * @param {string[]} allowedRoles - Array of allowed roles (optional)
 * @returns {object} - Decoded user object
 * @throws {Error} - If authentication fails
 */
export function requireAuth(req, allowedRoles = []) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new Error('Authorization required');
  }

  try {
    const decoded = verifyToken(token);
    
    // Check if user has required role
    if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
      throw new Error('Insufficient permissions');
    }
    
    return decoded;
  } catch (error) {
    if (error.message === 'Insufficient permissions') {
      throw error;
    }
    throw new Error('Invalid or expired token');
  }
}