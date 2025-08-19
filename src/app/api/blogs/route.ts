import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '@/src/services/blog.service';
import { authenticateRequest, authorizeUser } from '@/src/utils/auth';
import { ApiResponse, BlogListResponse } from '@/src/types/blog.types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || undefined;
    const author = searchParams.get('author') || undefined;
    const search = searchParams.get('search') || undefined;

    const result = await BlogService.list(page, limit, category, author, search);
    
    const response: ApiResponse<BlogListResponse> = {
      success: true,
      message: 'Blogs retrieved successfully',
      data: result,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error.message || 'Failed to fetch blogs',
    };

    return NextResponse.json(response, { status: error.status || 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate and authorize admin user
    const user = await authenticateRequest(request);
    authorizeUser(user, 'ADMIN');

    const body = await request.json();
    
    // Basic validation
    if (!body.title || !body.excerpt || !body.content || !body.read_time || !body.category || !body.author) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const blog = await BlogService.create(body);
    
    const response: ApiResponse = {
      success: true,
      message: 'Blog created successfully',
      data: blog,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error.message || 'Failed to create blog',
    };

    return NextResponse.json(response, { status: error.status || 500 });
  }
}