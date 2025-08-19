'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Blog, BlogFormData } from '@/src/types/admin.types';
import { apiClient } from '@/src/lib/api';

interface BlogFormProps {
  blog?: Blog;
  isEditing?: boolean;
}

export default function BlogForm({ blog, isEditing = false }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    excerpt: '',
    content: '',
    read_time: '',
    category: '',
    author: '',
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [tagInput, setTagInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        read_time: blog.read_time,
        category: blog.category,
        author: blog.author,
        tags: blog.tags || [],
      });
    }
  }, [blog]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isEditing && blog) {
        await apiClient.updateBlog(blog.id, formData);
      } else {
        await apiClient.createBlog(formData);
      }
      
      router.push('/admin/blogs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save blog');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              {isEditing ? 'Update your blog post information.' : 'Fill in the details for your new blog post.'}
            </p>
          </div>
        </div>
        
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">{error}</div>
                  </div>
                )}

                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                      Author *
                    </label>
                    <input
                      type="text"
                      name="author"
                      id="author"
                      required
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData.author}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category *
                    </label>
                    <select
                      name="category"
                      id="category"
                      required
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Blockchain">Blockchain</option>
                      <option value="Supply Chain">Supply Chain</option>
                      <option value="Innovation">Innovation</option>
                      <option value="Security">Security</option>
                      <option value="Platform">Platform</option>
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="read_time" className="block text-sm font-medium text-gray-700">
                      Read Time *
                    </label>
                    <input
                      type="text"
                      name="read_time"
                      id="read_time"
                      required
                      placeholder="e.g., 5 min read"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={formData.read_time}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                      Excerpt *
                    </label>
                    <textarea
                      name="excerpt"
                      id="excerpt"
                      rows={3}
                      required
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Brief description of the blog post..."
                      value={formData.excerpt}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                      Content *
                    </label>
                    <textarea
                      name="content"
                      id="content"
                      rows={12}
                      required
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="Write your blog content here..."
                      value={formData.content}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                      Tags
                    </label>
                    <div className="mt-1">
                      <div className="flex">
                        <input
                          type="text"
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-l-md"
                          placeholder="Add a tag..."
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={handleTagKeyPress}
                        />
                        <button
                          type="button"
                          onClick={addTag}
                          className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm hover:bg-gray-100"
                        >
                          Add
                        </button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {formData.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      isEditing ? 'Update Blog' : 'Create Blog'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}