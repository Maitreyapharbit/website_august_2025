"use client"

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
export default function AdminHomePage() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p className="text-sm text-gray-600 mt-2">You are logged in as admin.</p>
      <button onClick={handleLogout} className="mt-4 bg-gray-900 text-white px-4 py-2 rounded">Log out</button>
    </main>
  )
}

