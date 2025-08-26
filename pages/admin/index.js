import AdminLayout from '../../components/AdminLayout'
import Head from 'next/head'

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Head>
        <title>Admin Dashboard - Pharbit</title>
        <meta name="description" content="Admin dashboard and management" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="space-y-6">
        <div className="border-b border-gray-700 pb-5">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="mt-2 text-gray-400">Manage your application from the admin panel</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-white mb-4">Welcome to Admin Panel</h3>
          <p className="text-gray-400">Your admin dashboard is ready!</p>
        </div>
      </div>
    </AdminLayout>
  )
}
