import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

interface AdminUser {
  id: string;
  email: string;
  role: string;
  displayName?: string;
}

interface DashboardStats {
  totalBlogs: number;
  totalContacts: number;
  recentActivity: Array<{
    action: string;
    timestamp: string;
    details?: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'blogs' | 'contacts' | 'company'>('overview');
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Verify token and get user profile
    const verifyAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (data.success && data.data.user.role === 'ADMIN') {
          setUser(data.data.user);
          await loadDashboardStats(token);
        } else {
          localStorage.removeItem('admin_token');
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, [router]);

  const loadDashboardStats = async (token: string) => {
    try {
      // Load blogs count
      const blogsResponse = await fetch('/api/blogs');
      const blogsData = await blogsResponse.json();
      
      // Load contacts count (requires admin token)
      const contactsResponse = await fetch('/api/contact', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const contactsData = await contactsResponse.json();

      setStats({
        totalBlogs: blogsData.success ? blogsData.data.total : 0,
        totalContacts: contactsData.success ? contactsData.data.total : 0,
        recentActivity: [
          { action: 'Admin login', timestamp: new Date().toISOString(), details: 'Successful authentication' },
          { action: 'Dashboard accessed', timestamp: new Date().toISOString(), details: 'Admin dashboard loaded' }
        ]
      });
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
      setStats({
        totalBlogs: 0,
        totalContacts: 0,
        recentActivity: []
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Pharbit</title>
        <meta name="description" content="Pharbit admin dashboard" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Header */}
        <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <img 
                    src="/images/pharbit_(only_logo) copy copy.png" 
                    alt="Pharbit Logo" 
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Pharbit Admin</h1>
                  <p className="text-sm text-gray-300">Dashboard</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{user.displayName || 'Pharbit Admin'}</p>
                  <p className="text-xs text-gray-300">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg transition-all duration-300 text-sm"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-black/10 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: '📊' },
                { id: 'blogs', label: 'Blogs', icon: '📝' },
                { id: 'contacts', label: 'Contacts', icon: '📧' },
                { id: 'company', label: 'Company', icon: '🏢' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-300">Total Blogs</p>
                        <p className="text-3xl font-bold text-white">{stats?.totalBlogs || 0}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📝</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-300">Total Contacts</p>
                        <p className="text-3xl font-bold text-white">{stats?.totalContacts || 0}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">📧</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-300">System Status</p>
                        <p className="text-lg font-bold text-green-400">Online</p>
                      </div>
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">✅</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-300">API Status</p>
                        <p className="text-lg font-bold text-green-400">Healthy</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🚀</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {stats?.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
                        <div>
                          <p className="text-white font-medium">{activity.action}</p>
                          {activity.details && (
                            <p className="text-sm text-gray-300">{activity.details}</p>
                          )}
                        </div>
                        <span className="text-sm text-gray-400">
                          {new Date(activity.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Blog Management</h2>
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                  Create New Blog
                </button>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <p className="text-white">Blog management features will be implemented here.</p>
                <p className="text-gray-300 text-sm mt-2">
                  This will include creating, editing, and deleting blog posts using the existing API endpoints.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Contact Management</h2>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <p className="text-white">Contact management features will be implemented here.</p>
                <p className="text-gray-300 text-sm mt-2">
                  This will include viewing and managing contact form submissions.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Company Settings</h2>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <p className="text-white">Company settings will be implemented here.</p>
                <p className="text-gray-300 text-sm mt-2">
                  This will include updating company information, contact details, and other settings.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;