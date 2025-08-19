import { Router } from 'express';
import { BlogController } from '../controllers/blogController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { createBlogValidation, updateBlogValidation, paginationValidation } from '../middleware/validation';

const router = Router();

// GET /api/blogs - Get all blog posts (public)
router.get('/', paginationValidation, BlogController.getAllBlogs);

// GET /api/blogs/:id - Get single blog post (public)
router.get('/:id', BlogController.getBlogById);

// POST /api/blogs - Create new blog post (admin only)
router.post('/', authenticateToken, requireAdmin, createBlogValidation, BlogController.createBlog);

// PUT /api/blogs/:id - Update blog post (admin only)
router.put('/:id', authenticateToken, requireAdmin, updateBlogValidation, BlogController.updateBlog);

// DELETE /api/blogs/:id - Delete blog post (admin only)
router.delete('/:id', authenticateToken, requireAdmin, BlogController.deleteBlog);

export default router;