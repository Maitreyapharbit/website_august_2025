"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationValidation = exports.contactValidation = exports.updateCompanyValidation = exports.updateBlogValidation = exports.createBlogValidation = exports.loginValidation = exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: 'Validation failed',
            details: errors.array()
        });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
exports.loginValidation = [
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    exports.handleValidationErrors
];
exports.createBlogValidation = [
    (0, express_validator_1.body)('title').trim().isLength({ min: 1, max: 200 }).withMessage('Title is required (max 200 characters)'),
    (0, express_validator_1.body)('content').trim().isLength({ min: 1 }).withMessage('Content is required'),
    (0, express_validator_1.body)('excerpt').trim().isLength({ min: 1, max: 500 }).withMessage('Excerpt is required (max 500 characters)'),
    (0, express_validator_1.body)('image_url').optional().isURL().withMessage('Image URL must be valid'),
    exports.handleValidationErrors
];
exports.updateBlogValidation = [
    (0, express_validator_1.param)('id').isUUID().withMessage('Valid blog ID is required'),
    (0, express_validator_1.body)('title').optional().trim().isLength({ min: 1, max: 200 }).withMessage('Title must be 1-200 characters'),
    (0, express_validator_1.body)('content').optional().trim().isLength({ min: 1 }).withMessage('Content cannot be empty'),
    (0, express_validator_1.body)('excerpt').optional().trim().isLength({ min: 1, max: 500 }).withMessage('Excerpt must be 1-500 characters'),
    (0, express_validator_1.body)('image_url').optional().isURL().withMessage('Image URL must be valid'),
    exports.handleValidationErrors
];
exports.updateCompanyValidation = [
    (0, express_validator_1.body)('name').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Company name must be 1-100 characters'),
    (0, express_validator_1.body)('description').optional().trim().isLength({ max: 1000 }).withMessage('Description must be max 1000 characters'),
    (0, express_validator_1.body)('email').optional().isEmail().normalizeEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('phone').optional().trim().isLength({ max: 20 }).withMessage('Phone must be max 20 characters'),
    (0, express_validator_1.body)('address').optional().trim().isLength({ max: 500 }).withMessage('Address must be max 500 characters'),
    exports.handleValidationErrors
];
exports.contactValidation = [
    (0, express_validator_1.body)('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required (max 100 characters)'),
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message is required (max 2000 characters)'),
    exports.handleValidationErrors
];
exports.paginationValidation = [
    (0, express_validator_1.query)('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    (0, express_validator_1.query)('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    exports.handleValidationErrors
];
//# sourceMappingURL=validation.js.map