'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Blog {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  read_time: string
  category: string
  author: string
  tags: string[]
  created_at: string
  updated_at: string
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  // Auto-authenticate on component mount
  useEffect(() => {
    authenticateAdmin()
  }, [])

  const authenticateAdmin = async () => {
    try {
      // First check if already authenticated
      const authCheck = await fetch('/api/admin/auth-test', {
        credentials: 'include'
      })
      const authData = await authCheck.json()
      
      if (authData.authenticated) {
        setIsAuthenticated(true)
        fetchBlogs()
        return
      }

      // If not authenticated, auto-login
      const loginResponse = await fetch('/api/admin/auth-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action: 'login' })
      })

      if (loginResponse.ok) {
        setIsAuthenticated(true)
        fetchBlogs()
      } else {
        setError('Failed to authenticate as admin')
        setLoading(false)
      }
    } catch (err) {
      console.error('Authentication error:', err)
      setError('Authentication failed')
      setLoading(false)
    }
  }

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs', {
        credentials: 'include'
      })
      if (!response.ok) {
        const details = await response.json().catch(() => ({} as any))
        const message = details?.error || 'Failed to fetch blogs'
        throw new Error(message)
      }
      const data = await response.json()
      setBlogs(data.blogs || [])
    } catch (err: any) {
      setError(err?.message || 'Failed to load blogs')
      console.error('Admin Blogs fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteBlog = async (id: string) => {
    try {
      console.log('Attempting to delete blog:', id)
      
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      })
      
      console.log('Delete response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Delete error response:', errorData)
        throw new Error(errorData.error || `Failed to delete blog (${response.status})`)
      }
      
      const result = await response.json()
      console.log('Delete success:', result)
      
      setBlogs(blogs.filter(blog => blog.id !== id))
      setShowDeleteModal(null)
      setError('') // Clear any previous errors
    } catch (err: any) {
      console.error('Delete error:', err)
      setError(`Failed to delete blog: ${err.message}`)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating as admin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Blog Management</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your blog posts</p>
        </div>
        <button
          onClick={() => router.push('/admin/blogs/new')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add New Blog
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No blogs found. Create your first blog post!
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                    <div className="text-sm text-gray-500">{blog.excerpt.substring(0, 100)}...</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {blog.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(blog.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => router.push(`/admin/blogs/edit/${blog.id}`)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setShowDeleteModal(blog.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Delete Blog Post</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this blog post? This action cannot be undone.
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setShowDeleteModal(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteBlog(showDeleteModal)}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export const dynamic = 'force-dynamic'