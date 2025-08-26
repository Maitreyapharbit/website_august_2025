'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthService } from '@/lib/auth'

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user } = await AuthService.getCurrentUser()
        
        if (!user) {
          router.push('/admin/login')
          return
        }

        if (user.role !== 'admin' && user.role !== 'super_admin') {
          router.push('/admin/login')
          return
        }

        setUser(user)
      } catch (error) {
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSignOut = async () => {
    try {
      await AuthService.signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/80" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-gray-800">
          <SidebarContent user={user} onSignOut={handleSignOut} />
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-800 px-6 pb-4">
          <SidebarContent user={user} onSignOut={handleSignOut} />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-700 bg-gray-800 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-700" />
              <div className="flex items-center gap-x-4">
                <span className="text-sm text-gray-300">Welcome, {user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ user, onSignOut }) {
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Users', href: '/admin/users', icon: '👥' },
    { name: 'Content', href: '/admin/content', icon: '📝' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ]

  return (
    <>
      <div className="flex h-16 shrink-0 items-center">
        <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        <div className="ml-3">
          <h1 className="text-lg font-semibold text-white">Admin Panel</h1>
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white hover:bg-gray-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors"
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <div className="border-t border-gray-700 pt-4">
              <div className="px-2 py-3">
                <div className="text-sm text-gray-400 mb-2">Signed in as:</div>
                <div className="text-sm text-white font-medium truncate">{user.email}</div>
                <div className="text-xs text-gray-500 capitalize">{user.role}</div>
              </div>
              <button
                onClick={onSignOut}
                className="w-full text-left text-gray-400 hover:text-white hover:bg-gray-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors"
              >
                <span>🚪</span>
                Sign out
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </>
  )
}
