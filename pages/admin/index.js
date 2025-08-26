'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'
import Head from 'next/head'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const tabs = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'content', name: 'Content', icon: '📝' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />
      case 'users':
        return <UsersTab />
      case 'content':
        return <ContentTab />
      case 'settings':
        return <SettingsTab />
      default:
        return <DashboardTab />
    }
  }

  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard - Pharbit</title>
        <meta name="description" content="Admin dashboard and management" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400 mt-2">
            Welcome to your admin control panel. Manage users, content, and system settings.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-800 rounded-lg">
          <div className="border-b border-gray-700">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

function DashboardTab() {
  const stats = [
    { name: 'Total Users', value: '0', change: '+0%', changeType: 'increase', icon: '👥' },
    { name: 'Active Content', value: '0', change: '+0%', changeType: 'increase', icon: '📝' },
    { name: 'System Status', value: '🟢 Online', change: 'All systems operational', changeType: 'neutral', icon: '🖥️' },
    { name: 'Last Backup', value: 'Never', change: 'No backups yet', changeType: 'decrease', icon: '💾' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-gray-700 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-300">{stat.name}</p>
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p className={`text-sm ${
                  stat.changeType === 'increase' ? 'text-green-400' :
                  stat.changeType === 'decrease' ? 'text-red-400' :
                  'text-gray-400'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <p className="text-gray-400">No recent activity to display</p>
        </div>
      </div>
    </div>
  )
}

function UsersTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">User Management</h3>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors">
          + Add User
        </button>
      </div>
      
      <div className="bg-gray-700 rounded-lg p-6">
        <div className="text-center py-8">
          <p className="text-gray-400">User management features coming soon...</p>
        </div>
      </div>
    </div>
  )
}

function ContentTab() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Content Management</h3>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors">
          + Create Content
        </button>
      </div>
      
      <div className="bg-gray-700 rounded-lg p-6">
        <div className="text-center py-8">
          <p className="text-gray-400">Content management features coming soon...</p>
        </div>
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-white">System Settings</h3>
      
      <div className="bg-gray-700 rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Email Notifications</span>
            <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors">
              Enabled
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Two-Factor Authentication</span>
            <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors">
              Disabled
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Auto Backup</span>
            <button className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors">
              Disabled
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
