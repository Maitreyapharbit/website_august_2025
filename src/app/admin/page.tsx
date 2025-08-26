'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function AdminHomePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')

  if (!user || user.role !== 'admin') {
    router.replace('/admin/login')
    return null
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-600 mt-2">
          Welcome back, {user.email}. You have admin privileges.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'users', name: 'Users', icon: '👥' },
              { id: 'content', name: 'Content', icon: '📝' },
              { id: 'settings', name: 'Settings', icon: '⚙️' },
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900">Total Users</h3>
                  <p className="text-3xl font-bold text-blue-600">0</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-900">Active Content</h3>
                  <p className="text-3xl font-bold text-green-600">0</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-900">System Status</h3>
                  <p className="text-3xl font-bold text-purple-600">🟢</p>
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
