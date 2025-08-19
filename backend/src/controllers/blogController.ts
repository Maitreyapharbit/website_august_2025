import { Request, Response, NextFunction } from 'express';
import { BlogService } from '../services/blogService';
import { ApiResponse } from '../types';

export class BlogController {
  static async getAllBlogs(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await BlogService.getAllBlogs(page, limit);
      
      const response: ApiResponse = {
        success: true,
        message: 'Blogs retrieved successfully',
        data: result
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getBlogById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const blog = await BlogService.getBlogById(id);
      
      const response: ApiResponse = {
        success: true,
        message: 'Blog retrieved successfully',
        data: blog
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const blogData = req.body;
      const blog = await BlogService.createBlog(blogData);
      
      const response: ApiResponse = {
        success: true,
        message: 'Blog created successfully',
        data: blog
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      const blog = await BlogService.updateBlog(id, updates);
      
      const response: ApiResponse = {
        success: true,
        message: 'Blog updated successfully',
        data: blog
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteBlog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await BlogService.deleteBlog(id);
      
      const response: ApiResponse = {
        success: true,
        message: 'Blog deleted successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}