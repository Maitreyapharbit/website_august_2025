/**
 * Standard API response helpers
 */

/**
 * Success response
 * @param {object} res - Response object
 * @param {any} data - Response data
 * @param {string} message - Success message
 * @param {number} status - HTTP status code
 */
export function successResponse(res, data, message = 'Success', status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data
  });
}

/**
 * Error response
 * @param {object} res - Response object
 * @param {string} error - Error message
 * @param {number} status - HTTP status code
 */
export function errorResponse(res, error, status = 500) {
  return res.status(status).json({
    success: false,
    error
  });
}

/**
 * Validation error response
 * @param {object} res - Response object
 * @param {array} errors - Array of validation errors
 */
export function validationErrorResponse(res, errors) {
  return res.status(400).json({
    success: false,
    error: 'Validation failed',
    details: errors
  });
}

/**
 * Not found response
 * @param {object} res - Response object
 * @param {string} resource - Resource name
 */
export function notFoundResponse(res, resource = 'Resource') {
  return res.status(404).json({
    success: false,
    error: `${resource} not found`
  });
}

/**
 * Unauthorized response
 * @param {object} res - Response object
 * @param {string} message - Error message
 */
export function unauthorizedResponse(res, message = 'Unauthorized') {
  return res.status(401).json({
    success: false,
    error: message
  });
}

/**
 * Forbidden response
 * @param {object} res - Response object
 * @param {string} message - Error message
 */
export function forbiddenResponse(res, message = 'Forbidden') {
  return res.status(403).json({
    success: false,
    error: message
  });
}