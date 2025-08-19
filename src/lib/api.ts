import { LoginCredentials, LoginResponse, BlogListResponse, Blog, BlogFormData, Company, CompanyFormData, ApiResponse } from '@/src/types/admin.types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

class ApiClient {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('admin_access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    return response.json();
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return this.handleResponse<LoginResponse>(response);
  }

  async getProfile(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<ApiResponse<any>>(response);
  }

  // Blog endpoints
  async getBlogs(): Promise<BlogListResponse> {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<BlogListResponse>(response);
  }

  async getBlog(id: string): Promise<ApiResponse<Blog>> {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<ApiResponse<Blog>>(response);
  }

  async createBlog(data: BlogFormData): Promise<ApiResponse<Blog>> {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<ApiResponse<Blog>>(response);
  }

  async updateBlog(id: string, data: Partial<BlogFormData>): Promise<ApiResponse<Blog>> {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<ApiResponse<Blog>>(response);
  }

  async deleteBlog(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<ApiResponse>(response);
  }

  // Company endpoints
  async getCompany(id: string): Promise<ApiResponse<Company>> {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      headers: this.getAuthHeaders(),
    });
    return this.handleResponse<ApiResponse<Company>>(response);
  }

  async updateCompany(id: string, data: CompanyFormData): Promise<ApiResponse<Company>> {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return this.handleResponse<ApiResponse<Company>>(response);
  }
}

export const apiClient = new ApiClient();