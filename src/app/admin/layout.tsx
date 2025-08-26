"use client"

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      const user = data.user
      if (!isMounted) return

      // Optional: enforce admin role using app_metadata.role === 'admin'
      const role = (user?.app_metadata as any)?.role
      const isAdmin = !!user && (!role || role === 'admin')
      if (!isAdmin) {
        router.replace('/admin/login')
        setChecked(true)
        return
      }
      setAuthorized(true)
      setChecked(true)
    })()
    return () => {
      isMounted = false
    }
  }, [router])

  if (!checked) {
    return null
  }

  if (!authorized) {
    return null
  }

  return (
    <section>
      {children}
    </section>
  )
}

