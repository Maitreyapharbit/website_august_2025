"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const database_1 = require("../config/database");
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../config/logger");
class BlogService {
    static async getAllBlogs(page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;
            const { count, error: countError } = await database_1.supabase
                .from('blogs')
                .select('*', { count: 'exact', head: true });
            if (countError) {
                throw new errorHandler_1.ApiError(500, 'Failed to get blog count');
            }
            const { data: blogs, error } = await database_1.supabase
                .from('blogs')
                .select('*')
                .order('created_at', { ascending: false })
                .range(offset, offset + limit - 1);
            if (error) {
                throw new errorHandler_1.ApiError(500, 'Failed to fetch blogs');
            }
            const total = count || 0;
            const totalPages = Math.ceil(total / limit);
            return {
                data: blogs || [],
                total,
                page,
                limit,
                totalPages
            };
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            logger_1.logger.error('Get blogs error:', error);
            throw new errorHandler_1.ApiError(500, 'Failed to fetch blogs');
        }
    }
    static async getBlogById(id) {
        try {
            const { data: blog, error } = await database_1.supabase
                .from('blogs')
                .select('*')
                .eq('id', id)
                .single();
            if (error || !blog) {
                throw new errorHandler_1.ApiError(404, 'Blog not found');
            }
            return blog;
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            logger_1.logger.error('Get blog by ID error:', error);
            throw new errorHandler_1.ApiError(500, 'Failed to fetch blog');
        }
    }
    static async createBlog(blogData) {
        try {
            const { data: blog, error } = await database_1.supabaseAdmin
                .from('blogs')
                .insert({
                ...blogData,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            })
                .select()
                .single();
            if (error) {
                throw new errorHandler_1.ApiError(500, 'Failed to create blog');
            }
            logger_1.logger.info('Blog created successfully', { blogId: blog.id, title: blog.title });
            return blog;
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            logger_1.logger.error('Create blog error:', error);
            throw new errorHandler_1.ApiError(500, 'Failed to create blog');
        }
    }
    static async updateBlog(id, updates) {
        try {
            const { data: blog, error } = await database_1.supabaseAdmin
                .from('blogs')
                .update({
                ...updates,
                updated_at: new Date().toISOString()
            })
                .eq('id', id)
                .select()
                .single();
            if (error || !blog) {
                throw new errorHandler_1.ApiError(404, 'Blog not found or update failed');
            }
            logger_1.logger.info('Blog updated successfully', { blogId: id });
            return blog;
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            logger_1.logger.error('Update blog error:', error);
            throw new errorHandler_1.ApiError(500, 'Failed to update blog');
        }
    }
    static async deleteBlog(id) {
        try {
            const { error } = await database_1.supabaseAdmin
                .from('blogs')
                .delete()
                .eq('id', id);
            if (error) {
                throw new errorHandler_1.ApiError(500, 'Failed to delete blog');
            }
            logger_1.logger.info('Blog deleted successfully', { blogId: id });
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            logger_1.logger.error('Delete blog error:', error);
            throw new errorHandler_1.ApiError(500, 'Failed to delete blog');
        }
    }
}
exports.BlogService = BlogService;
//# sourceMappingURL=blogService.js.map