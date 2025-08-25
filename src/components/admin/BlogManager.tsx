'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

interface BlogManagerProps {
  blogs: Blog[];
  onBlogUpdate: () => void;
}

const BlogManager: React.FC<BlogManagerProps> = ({ blogs, onBlogUpdate }) => {
  const { token } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image_url: ''
    });
    setIsCreating(false);
    setEditingBlog(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editingBlog ? `/api/blogs/${editingBlog.id}` : '/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        resetForm();
        onBlogUpdate();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('Failed to save blog');
    }

    setIsLoading(false);
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image_url: blog.image_url || ''
    });
    setIsCreating(true);
  };

  const handleDelete = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        onBlogUpdate();
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  return (
    <div className="space-y-8">
      {/* Add New Blog Button */}
      {!isCreating && (
        <div className="text-center">
          <button
            onClick={() => setIsCreating(true)}
            className="btn-primary px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 mx-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Blog Post</span>
          </button>
        </div>
      )}

      {/* Blog Form */}
      {isCreating && (
        <div className="glass-immersive p-8 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-primary-white">
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h3>
            <button
              onClick={resetForm}
              className="text-primary-white hover:text-secondary-cyan transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group">
              <input
                type="text"
                placeholder=" "
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="form-input"
                required
              />
              <label className="form-label">Title</label>
            </div>

            <div className="form-group">
              <input
                type="url"
                placeholder=" "
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="form-input"
              />
              <label className="form-label">Image URL (optional)</label>
            </div>

            <div className="form-group">
              <textarea
                placeholder=" "
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="form-input resize-none"
                rows={3}
                required
              />
              <label className="form-label">Excerpt</label>
            </div>

            <div className="form-group">
              <textarea
                placeholder=" "
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="form-input resize-none"
                rows={8}
                required
              />
              <label className="form-label">Content</label>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner w-5 h-5"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>{editingBlog ? 'Update Blog' : 'Create Blog'}</span>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-primary-white">Manage Blog Posts</h3>
        {blogs.map((blog) => (
          <div key={blog.id} className="glass-subtle p-6 rounded-xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-primary-white mb-2">{blog.title}</h4>
                <p className="text-primary-white opacity-80 text-sm mb-4">{blog.excerpt}</p>
                <p className="text-secondary-cyan text-xs">
                  Created: {new Date(blog.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(blog)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManager;