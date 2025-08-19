"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const blogService_1 = require("../services/blogService");
class BlogController {
    static async getAllBlogs(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await blogService_1.BlogService.getAllBlogs(page, limit);
            const response = {
                success: true,
                message: 'Blogs retrieved successfully',
                data: result
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async getBlogById(req, res, next) {
        try {
            const { id } = req.params;
            const blog = await blogService_1.BlogService.getBlogById(id);
            const response = {
                success: true,
                message: 'Blog retrieved successfully',
                data: blog
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async createBlog(req, res, next) {
        try {
            const blogData = req.body;
            const blog = await blogService_1.BlogService.createBlog(blogData);
            const response = {
                success: true,
                message: 'Blog created successfully',
                data: blog
            };
            res.status(201).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateBlog(req, res, next) {
        try {
            const { id } = req.params;
            const updates = req.body;
            const blog = await blogService_1.BlogService.updateBlog(id, updates);
            const response = {
                success: true,
                message: 'Blog updated successfully',
                data: blog
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteBlog(req, res, next) {
        try {
            const { id } = req.params;
            await blogService_1.BlogService.deleteBlog(id);
            const response = {
                success: true,
                message: 'Blog deleted successfully'
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.BlogController = BlogController;
//# sourceMappingURL=blogController.js.map