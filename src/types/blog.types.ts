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

export interface CreateBlogRequest {
  title: string;
  excerpt: string;
  content: string;
  read_time: string;
  category: string;
  author: string;
  tags?: string[];
}

export interface UpdateBlogRequest {
  title?: string;
  excerpt?: string;
  content?: string;
  read_time?: string;
  category?: string;
  author?: string;
  tags?: string[];
}

export interface BlogListResponse {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}