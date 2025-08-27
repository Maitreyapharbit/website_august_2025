"use client"

import Link from 'next/link'

export default function DashboardClient() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
        <p className="text-sm text-gray-600 mt-1">Manage blogs and company information</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Blogs</h2>
          <p className="text-sm text-gray-600 mt-1">Create, edit, and delete blog posts</p>
          <div className="flex gap-3 mt-4">
            <Link href="/admin/blogs" className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
              Open Blogs
            </Link>
            <Link href="/admin/blogs/new" className="px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">
              New Blog
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Company</h2>
          <p className="text-sm text-gray-600 mt-1">Update company profile and contact info</p>
          <div className="mt-4">
            <Link href="/admin/company" className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
              Manage Company
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/admin/control-panel" className="text-indigo-600 hover:text-indigo-800">
                Control Panel
              </Link>
            </li>
            <li>
              <Link href="/" className="text-indigo-600 hover:text-indigo-800">
                View Site
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

