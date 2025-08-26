import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function ControlPanelPage() {
  const isAuthed = cookies().get('admin_auth')?.value === '1'
  if (!isAuthed) redirect('/admin/login')
  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Control Panel</h1>
        <p className="text-sm text-gray-600 mt-2">
          Restricted area. Only authenticated admins can access these controls.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">System Controls</h2>
          <ul className="mt-4 list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>Toggle maintenance mode</li>
            <li>View error logs</li>
            <li>Trigger cache purge</li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900">User Management</h2>
          <ul className="mt-4 list-disc list-inside text-sm text-gray-700 space-y-2">
            <li>List admins</li>
            <li>Revoke access</li>
            <li>Audit activity</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export const dynamic = 'force-dynamic'

