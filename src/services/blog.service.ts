import { supabase } from '../config/database';
import { ApiError } from '../middleware/error';
import { Blog, CreateBlogRequest, UpdateBlogRequest, BlogListResponse } from '../types/blog.types';

export class BlogService {
	static async create(data: CreateBlogRequest): Promise<Blog> {
		const { data: blog, error } = await supabase
			.from('blogs')
			.insert({
				...data,
				tags: data.tags || [],
			})
			.select()
			.single();
		
		if (error) {
			throw new ApiError(500, 'Failed to create blog post');
		}
		return blog;
	}
	
	static async get(id: string): Promise<Blog> {
		const { data, error } = await supabase
			.from('blogs')
			.select('*')
			.eq('id', id)
			.single();
		
		if (error) {
			throw new ApiError(404, 'Blog post not found');
		}
		return data;
	}
	
	static async list(page: number = 1, limit: number = 10, category?: string, author?: string, search?: string): Promise<BlogListResponse> {
		let query = supabase
			.from('blogs')
			.select('*', { count: 'exact' });
		
		// Apply filters
		if (category) {
			query = query.eq('category', category);
		}
		
		if (author) {
			query = query.eq('author', author);
		}
		
		if (search) {
			query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%,content.ilike.%${search}%`);
		}
		
		// Apply pagination
		const from = (page - 1) * limit;
		const to = from + limit - 1;
		
		const { data, error, count } = await query
			.order('created_at', { ascending: false })
			.range(from, to);
		
		if (error) {
			throw new ApiError(500, 'Failed to fetch blog posts');
		}
		
		const total = count || 0;
		const totalPages = Math.ceil(total / limit);
		
		return {
			blogs: data || [],
			total,
			page,
			limit,
			totalPages,
		};
	}
	
	static async update(id: string, data: UpdateBlogRequest): Promise<Blog> {
		const { data: blog, error } = await supabase
			.from('blogs')
			.update(data)
			.eq('id', id)
			.select()
			.single();
		
		if (error) {
			throw new ApiError(500, 'Failed to update blog post');
		}
		return blog;
	}
	
	static async remove(id: string): Promise<void> {
		const { error } = await supabase
			.from('blogs')
			.delete()
			.eq('id', id);
		
		if (error) {
			throw new ApiError(500, 'Failed to delete blog post');
		}
	}
}