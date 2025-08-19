import { body, param, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Auth validation rules
export const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  handleValidationErrors
];

// Blog validation rules
export const createBlogValidation = [
  body('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required (max 200 characters)'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
  body('excerpt').trim().isLength({ min: 1, max: 500 }).withMessage('Excerpt is required (max 500 characters)'),
  body('image_url').optional().isURL().withMessage('Image URL must be valid'),
  handleValidationErrors
];

export const updateBlogValidation = [
  param('id').isUUID().withMessage('Valid blog ID is required'),
  body('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be 1-200 characters'),
  body('content').optional().trim().isLength({ min: 1 }).withMessage('Content cannot be empty'),
  body('excerpt').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Excerpt must be 1-500 characters'),
  body('image_url').optional().isURL().withMessage('Image URL must be valid'),
  handleValidationErrors
];

// Company validation rules
export const updateCompanyValidation = [
  body('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Company name must be 1-100 characters'),
  body('description').optional().trim().isLength({ max: 1000 }).withMessage('Description must be max 1000 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone must be max 20 characters'),
  body('address').optional().trim().isLength({ max: 500 }).withMessage('Address must be max 500 characters'),
  handleValidationErrors
];

// Contact validation rules
export const contactValidation = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required (max 100 characters)'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message is required (max 2000 characters)'),
  handleValidationErrors
];

// Pagination validation
export const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  handleValidationErrors
];