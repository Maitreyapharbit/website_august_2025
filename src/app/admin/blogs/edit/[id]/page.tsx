'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BlogForm from '@/src/components/admin/BlogForm';
import { Blog } from '@/src/types/admin.types';
import { apiClient } from '@/src/lib/api';

export default function EditBlogPage() {
  const params = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiClient.getBlog(params.id as string);
        if (response.success && response.data) {
          setBlog(response.data);
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        setError('Failed to fetch blog');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      </div>
    );
  }

  return blog ? <BlogForm blog={blog} isEditing={true} /> : null;
}