'use client'

import { useRef, useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'
import { getSupabaseBrowserClient } from '@/lib/supabase/client'

interface AuthUser extends User {
  role?: string
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)
  const supabaseRef = useRef<ReturnType<typeof getSupabaseBrowserClient> | null>(null)

  useEffect(() => {
    // Initialize client on the browser only
    try {
      supabaseRef.current = getSupabaseBrowserClient()
    } catch (e) {
      // Missing env or called on server; do not proceed
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      const supabase = supabaseRef.current!
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        // Fetch user role from profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
        
        setUser({
          ...session.user,
          role: profile?.role || 'user'
        })
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabaseRef.current!.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Fetch user role from profile
          const supabase = supabaseRef.current!
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()
          
          setUser({
            ...session.user,
            role: profile?.role || 'user'
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabaseRef.current!.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  }

  const signOut = async () => {
    const { error } = await supabaseRef.current!.auth.signOut()
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabaseRef.current!.auth.signUp({
      email,
      password,
    })
    return { data, error }
  }

  return {
    user,
    loading,
    signIn,
    signOut,
    signUp,
  }
}
