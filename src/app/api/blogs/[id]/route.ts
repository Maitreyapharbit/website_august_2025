import { NextRequest, NextResponse } from 'next/server';
import { BlogService } from '../../../../services/blog.service';
import { authenticateRequest, authorizeUser } from '../../../../utils/auth';
import { ApiResponse } from '../../../../types/blog.types';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blog = await BlogService.get(params.id);
    
    const response: ApiResponse = {
      success: true,
      message: 'Blog retrieved successfully',
      data: blog,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error.message || 'Failed to fetch blog',
    };

    return NextResponse.json(response, { status: error.status || 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate and authorize admin user
    const user = await authenticateRequest(request);
    authorizeUser(user, 'ADMIN');

    const body = await request.json();
    
    const blog = await BlogService.update(params.id, body);
    
    const response: ApiResponse = {
      success: true,
      message: 'Blog updated successfully',
      data: blog,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error updating blog:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error.message || 'Failed to update blog',
    };

    return NextResponse.json(response, { status: error.status || 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate and authorize admin user
    const user = await authenticateRequest(request);
    authorizeUser(user, 'ADMIN');

    await BlogService.remove(params.id);
    
    const response: ApiResponse = {
      success: true,
      message: 'Blog deleted successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    
    const response: ApiResponse = {
      success: false,
      error: error.message || 'Failed to delete blog',
    };

    return NextResponse.json(response, { status: error.status || 500 });
  }
}