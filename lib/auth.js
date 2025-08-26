import { supabase } from './supabase'
import { useState, useEffect } from 'react'

// Authentication context and utilities
export class AuthService {
  // Sign in with email and password
  static async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (error) throw error
      
      // Check if user has admin role
      const { profile } = await this.getUserProfile(data.user.id)
      if (!profile || (profile.role !== 'admin' && profile.role !== 'super_admin')) {
        await supabase.auth.signOut()
        throw new Error('Access denied. Admin privileges required.')
      }
      
      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error }
    }
  }

  // Sign out user
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  // Get current user session
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) throw error
      return { user, error: null }
    } catch (error) {
      return { user: null, error }
    }
  }

  // Get user profile from database
  static async getUserProfile(userId) {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (error) throw error
      return { profile, error: null }
    } catch (error) {
      return { profile: null, error }
    }
  }

  // Check if user has admin role
  static async isAdmin(userId) {
    try {
      const { profile, error } = await this.getUserProfile(userId)
      if (error) throw error
      
      return profile?.role === 'admin' || profile?.role === 'super_admin'
    } catch (error) {
      return false
    }
  }

  // Create new user (admin only)
  static async createUser(email, password, role = 'user') {
    try {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      })
      
      if (error) throw error
      
      // Create profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email,
          role
        })
      
      if (profileError) throw profileError
      
      return { user: data.user, error: null }
    } catch (error) {
      return { user: null, error }
    }
  }

  // Update user role (admin only)
  static async updateUserRole(userId, newRole) {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error }
    }
  }
}

// Hook for authentication state
export const useAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { user } = await AuthService.getCurrentUser()
      setUser(user)
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { user } = await AuthService.getCurrentUser()
          setUser(user)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return {
    user,
    loading,
    signIn: AuthService.signIn,
    signOut: AuthService.signOut,
    isAdmin: user ? AuthService.isAdmin(user.id) : false
  }
}
