import jwt from 'jsonwebtoken';

/**
 * Verify JWT token and return payload
 * @param {string} token - JWT token to verify
 * @returns {object} - Decoded token payload
 */
export function verifyToken(token) {
  const jwtSecret = process.env.JWT_ACCESS_SECRET;
  
  if (!jwtSecret) {
    throw new Error('JWT_ACCESS_SECRET environment variable is required');
  }
  
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

/**
 * Generate JWT token
 * @param {object} payload - Token payload
 * @param {string} expiresIn - Token expiration time
 * @returns {string} - JWT token
 */
export function generateToken(payload, expiresIn = '24h') {
  const jwtSecret = process.env.JWT_ACCESS_SECRET;
  
  if (!jwtSecret) {
    throw new Error('JWT_ACCESS_SECRET environment variable is required');
  }
  
  return jwt.sign(payload, jwtSecret, { expiresIn });
}

/**
 * Middleware to authenticate requests
 * @param {object} req - Request object
 * @returns {object} - Decoded user payload
 */
export function authenticateRequest(req) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new Error('Access token required');
  }

  return verifyToken(token);
}

/**
 * Check if user has admin role
 * @param {object} user - User object from token
 * @returns {boolean} - Whether user is admin
 */
export function isAdmin(user) {
  return user && user.role === 'ADMIN';
}