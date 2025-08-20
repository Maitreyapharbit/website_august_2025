import { verifyToken } from './jwt.js';

/**
 * Authentication middleware for Next.js API routes
 * @param {object} req - Request object
 * @returns {object} - User payload if authenticated
 * @throws {Error} - If authentication fails
 */
export function authenticateRequest(req) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  
  if (!token) {
    throw new Error('Authorization required');
  }
  
  try {
    const payload = verifyToken(token);
    return payload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Authorization middleware for Next.js API routes
 * @param {object} user - User payload from authentication
 * @param {array} roles - Required roles
 * @throws {Error} - If authorization fails
 */
export function authorizeUser(user, roles = []) {
  if (roles.length && !roles.includes(user.role)) {
    throw new Error('Insufficient permissions');
  }
}

/**
 * Combined auth middleware for API routes
 * @param {object} req - Request object
 * @param {array} requiredRoles - Required roles for access
 * @returns {object} - User payload if authorized
 */
export function requireAuth(req, requiredRoles = []) {
  const user = authenticateRequest(req);
  authorizeUser(user, requiredRoles);
  return user;
}