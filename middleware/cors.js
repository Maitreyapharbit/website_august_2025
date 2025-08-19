// CORS configuration for AWS Amplify deployment
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
  'Access-Control-Allow-Credentials': 'false'
};

/**
 * Apply CORS headers to response
 * @param {object} res - Response object
 */
export function applyCorsHeaders(res) {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });
}

/**
 * Handle preflight OPTIONS requests
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @returns {boolean} - Whether request was handled
 */
export function handlePreflight(req, res) {
  if (req.method === 'OPTIONS') {
    applyCorsHeaders(res);
    res.status(200).end();
    return true;
  }
  return false;
}

/**
 * CORS middleware for API routes
 * @param {function} handler - API route handler
 * @returns {function} - Wrapped handler with CORS
 */
export function withCors(handler) {
  return async (req, res) => {
    // Apply CORS headers
    applyCorsHeaders(res);
    
    // Handle preflight
    if (handlePreflight(req, res)) {
      return;
    }
    
    // Call original handler
    return handler(req, res);
  };
}