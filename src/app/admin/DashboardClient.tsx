'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalContacts: 0,
    recentActivity: []
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      // Fetch blogs count
      const blogsResponse = await fetch('/api/admin/blogs')
      const blogsData = await blogsResponse.json()
      
      setStats({
        totalBlogs: blogsData.blogs?.length || 0,
        totalContacts: 0, // Will be implemented when contacts API is ready
        recentActivity: []
      })
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-600 mt-2">
          Welcome back. You have admin privileges.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'blogs', name: 'Blogs', icon: '📝' },
              { id: 'company', name: 'Company', icon: '🏢' },
              { id: 'contacts', name: 'Contacts', icon: '📧' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-900">Total Blogs</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalBlogs}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-green-900">Contact Messages</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.totalContacts}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-purple-900">System Status</h3>
                    <p className="text-3xl font-bold text-purple-600">🟢</p>
                  </div>
                </div>
              )}
              
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <button
                    onClick={() => router.push('/admin/blogs/new')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">📝</div>
                      <div className="font-medium text-gray-900">Create New Blog</div>
                      <div className="text-sm text-gray-500">Write a new blog post</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('company')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">🏢</div>
                      <div className="font-medium text-gray-900">Update Company Info</div>
                      <div className="text-sm text-gray-500">Manage company details</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('blogs')}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">📊</div>
                      <div className="font-medium text-gray-900">Manage Blogs</div>
                      <div className="text-sm text-gray-500">Edit or delete posts</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-lg font-medium text-gray-900">Blog Management</h3>
                <p className="text-gray-500 mb-6">Create, edit, and manage your blog posts</p>
              </div>
              <div className="space-x-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <button
                    onClick={() => router.push('/admin/blogs')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium"
                  >
                    Manage Blogs
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="text-4xl mb-4">🏢</div>
                <h3 className="text-lg font-medium text-gray-900">Company Information</h3>
                <p className="text-gray-500 mb-6">Update your company details and contact information</p>
              </div>
              <div className="space-x-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <button
                    onClick={() => router.push('/admin/company')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md font-medium"
                  >
                    Edit Company Info
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="text-4xl mb-4">📧</div>
                <h3 className="text-lg font-medium text-gray-900">Contact Messages</h3>
                <p className="text-gray-500 mb-6">View and manage contact form submissions</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">Contact management coming soon...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="text-center py-12">
              <p className="text-gray-500">User management coming soon...</p>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="text-center py-12">
              <p className="text-gray-500">Content management coming soon...</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <p className="text-gray-500">Settings coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

