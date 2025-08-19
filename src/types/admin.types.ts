export interface User {
  userId: string;
  email: string;
  role: string;
  companyId?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: {
    user: User;
    tokens: AuthTokens;
  };
  error?: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  category: string;
  author: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  read_time: string;
  category: string;
  author: string;
  tags: string[];
}

export interface BlogListResponse {
  success: boolean;
  data: Blog[];
  error?: string;
}

export interface Company {
  id: string;
  name: string;
  address?: string;
  email?: string;
  phone?: string;
  website?: string;
}

export interface CompanyFormData {
  address: string;
  email: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}