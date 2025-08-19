'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';

interface DashboardStats {
  products: number;
  shipments: number;
  openAlerts: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('admin_access_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Fetch dashboard data
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('admin_access_token');
      
      // Fetch dashboard stats
      const statsResponse = await fetch('/api/analytics/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.data);
      }

      // Fetch user profile
      const profileResponse = await fetch('/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUser(profileData.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_access_token');
    localStorage.removeItem('admin_refresh_token');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen modern-section flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 mx-auto mb-4"></div>
          <p className="text-primary-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen modern-section">
      {/* Header */}
      <header className="border-b border-secondary-cyan/20 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo size="md" showText={true} />
              <div className="h-8 w-px bg-secondary-cyan/30"></div>
              <h1 className="text-xl font-bold text-primary-white">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {user && (
                <div className="text-primary-white">
                  <span className="text-sm opacity-80">Welcome, </span>
                  <span className="font-semibold">{user.first_name || user.email}</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary-white mb-2">
            Dashboard Overview
          </h2>
          <p className="text-primary-white opacity-80">
            Monitor and manage your pharmaceutical supply chain operations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-immersive p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-white">Products</h3>
              <div className="w-12 h-12 bg-gradient-to-br from-primary-blue to-secondary-cyan rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-secondary-cyan mb-2">
              {stats?.products || 0}
            </div>
            <p className="text-primary-white opacity-70 text-sm">Total registered products</p>
          </div>

          <div className="glass-immersive p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-white">Shipments</h3>
              <div className="w-12 h-12 bg-gradient-to-br from-secondary-neonGreen to-secondary-teal rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-secondary-cyan mb-2">
              {stats?.shipments || 0}
            </div>
            <p className="text-primary-white opacity-70 text-sm">Active shipments</p>
          </div>

          <div className="glass-immersive p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary-white">Alerts</h3>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-secondary-cyan mb-2">
              {stats?.openAlerts || 0}
            </div>
            <p className="text-primary-white opacity-70 text-sm">Open alerts</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass-immersive p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-primary-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="glass-subtle p-4 rounded-xl hover:neon-border transition-all duration-300 text-left">
              <div className="text-2xl mb-2">📦</div>
              <h4 className="font-semibold text-primary-white mb-1">Manage Products</h4>
              <p className="text-sm text-primary-white opacity-70">Add and manage pharmaceutical products</p>
            </button>

            <button className="glass-subtle p-4 rounded-xl hover:neon-border transition-all duration-300 text-left">
              <div className="text-2xl mb-2">🚚</div>
              <h4 className="font-semibold text-primary-white mb-1">Track Shipments</h4>
              <p className="text-sm text-primary-white opacity-70">Monitor shipment status and location</p>
            </button>

            <button className="glass-subtle p-4 rounded-xl hover:neon-border transition-all duration-300 text-left">
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-semibold text-primary-white mb-1">View Analytics</h4>
              <p className="text-sm text-primary-white opacity-70">Access detailed reports and insights</p>
            </button>

            <button className="glass-subtle p-4 rounded-xl hover:neon-border transition-all duration-300 text-left">
              <div className="text-2xl mb-2">⚙️</div>
              <h4 className="font-semibold text-primary-white mb-1">System Settings</h4>
              <p className="text-sm text-primary-white opacity-70">Configure system preferences</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 glass-immersive p-8 rounded-2xl">
          <h3 className="text-2xl font-bold text-primary-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 glass-subtle rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-secondary-cyan rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📦</span>
              </div>
              <div className="flex-1">
                <p className="text-primary-white font-medium">System initialized successfully</p>
                <p className="text-primary-white opacity-70 text-sm">Admin dashboard is ready for use</p>
              </div>
              <span className="text-secondary-cyan text-sm">Just now</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;