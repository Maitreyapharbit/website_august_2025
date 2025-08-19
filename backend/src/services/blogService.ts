import { supabase, supabaseAdmin } from '../config/database';
import { ApiError } from '../middleware/errorHandler';
import { Blog, PaginatedResponse } from '../types';
import { logger } from '../config/logger';

export class BlogService {
  static async getAllBlogs(page = 1, limit = 10): Promise<PaginatedResponse<Blog>> {
    try {
      const offset = (page - 1) * limit;

      // Get total count
      const { count, error: countError } = await supabase
        .from('blogs')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        throw new ApiError(500, 'Failed to get blog count');
      }

      // Get paginated blogs
      const { data: blogs, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new ApiError(500, 'Failed to fetch blogs');
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
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Get blogs error:', error);
      throw new ApiError(500, 'Failed to fetch blogs');
    }
  }

  static async getBlogById(id: string): Promise<Blog> {
    try {
      const { data: blog, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !blog) {
        throw new ApiError(404, 'Blog not found');
      }

      return blog;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Get blog by ID error:', error);
      throw new ApiError(500, 'Failed to fetch blog');
    }
  }

  static async createBlog(blogData: Omit<Blog, 'id' | 'created_at' | 'updated_at'>): Promise<Blog> {
    try {
      const { data: blog, error } = await supabaseAdmin
        .from('blogs')
        .insert({
          ...blogData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        throw new ApiError(500, 'Failed to create blog');
      }

      logger.info('Blog created successfully', { blogId: blog.id, title: blog.title });
      return blog;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Create blog error:', error);
      throw new ApiError(500, 'Failed to create blog');
    }
  }

  static async updateBlog(id: string, updates: Partial<Omit<Blog, 'id' | 'created_at'>>): Promise<Blog> {
    try {
      const { data: blog, error } = await supabaseAdmin
        .from('blogs')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error || !blog) {
        throw new ApiError(404, 'Blog not found or update failed');
      }

      logger.info('Blog updated successfully', { blogId: id });
      return blog;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Update blog error:', error);
      throw new ApiError(500, 'Failed to update blog');
    }
  }

  static async deleteBlog(id: string): Promise<void> {
    try {
      const { error } = await supabaseAdmin
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) {
        throw new ApiError(500, 'Failed to delete blog');
      }

      logger.info('Blog deleted successfully', { blogId: id });
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Delete blog error:', error);
      throw new ApiError(500, 'Failed to delete blog');
    }
  }
}