/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Whether email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize string input
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export function sanitizeString(input) {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Validate blog post data
 * @param {object} data - Blog post data
 * @returns {object} - Validation result
 */
export function validateBlogPost(data) {
  const errors = [];
  
  if (!data.title || data.title.trim().length === 0) {
    errors.push('Title is required');
  } else if (data.title.length > 200) {
    errors.push('Title must be less than 200 characters');
  }
  
  if (!data.excerpt || data.excerpt.trim().length === 0) {
    errors.push('Excerpt is required');
  } else if (data.excerpt.length > 500) {
    errors.push('Excerpt must be less than 500 characters');
  }
  
  if (!data.content || data.content.trim().length === 0) {
    errors.push('Content is required');
  }
  
  if (data.image_url && !isValidUrl(data.image_url)) {
    errors.push('Image URL must be a valid URL');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate contact form data
 * @param {object} data - Contact form data
 * @returns {object} - Validation result
 */
export function validateContactForm(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (data.name.length > 100) {
    errors.push('Name must be less than 100 characters');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  } else if (data.message.length > 2000) {
    errors.push('Message must be less than 2000 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate company data
 * @param {object} data - Company data
 * @returns {object} - Validation result
 */
export function validateCompanyData(data) {
  const errors = [];
  
  if (data.name !== undefined && (typeof data.name !== 'string' || data.name.length > 100)) {
    errors.push('Company name must be a string with max 100 characters');
  }
  
  if (data.description !== undefined && (typeof data.description !== 'string' || data.description.length > 1000)) {
    errors.push('Description must be a string with max 1000 characters');
  }
  
  if (data.email !== undefined && !isValidEmail(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (data.phone !== undefined && (typeof data.phone !== 'string' || data.phone.length > 20)) {
    errors.push('Phone must be a string with max 20 characters');
  }
  
  if (data.address !== undefined && (typeof data.address !== 'string' || data.address.length > 500)) {
    errors.push('Address must be a string with max 500 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is valid
 */
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate UUID format
 * @param {string} uuid - UUID to validate
 * @returns {boolean} - Whether UUID is valid
 */
export function isValidUUID(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}