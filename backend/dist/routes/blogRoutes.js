"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = require("../controllers/blogController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.get('/', validation_1.paginationValidation, blogController_1.BlogController.getAllBlogs);
router.get('/:id', blogController_1.BlogController.getBlogById);
router.post('/', auth_1.authenticateToken, auth_1.requireAdmin, validation_1.createBlogValidation, blogController_1.BlogController.createBlog);
router.put('/:id', auth_1.authenticateToken, auth_1.requireAdmin, validation_1.updateBlogValidation, blogController_1.BlogController.updateBlog);
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, blogController_1.BlogController.deleteBlog);
exports.default = router;
//# sourceMappingURL=blogRoutes.js.map