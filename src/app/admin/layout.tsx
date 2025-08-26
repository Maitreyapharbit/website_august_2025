import { ReactNode } from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = cookies()
  const isAuthed = cookieStore.get('admin_auth')?.value === '1'

  if (!isAuthed) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <form action="/api/admin/logout" method="post">
                <button className="text-sm text-red-600 hover:text-red-800">Sign Out</button>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
