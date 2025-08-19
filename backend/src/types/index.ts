export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Company {
  id: string;
  name: string;
  description: string;
  email: string;
  phone: string;
  address: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}