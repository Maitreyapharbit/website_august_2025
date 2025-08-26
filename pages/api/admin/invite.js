import { supabaseAdmin } from '@/lib/supabase'

const ADMIN_INVITE_SECRET = process.env.ADMIN_INVITE_SECRET

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Verify admin invite secret
    if (!ADMIN_INVITE_SECRET) {
      return res.status(500).json({
        error: 'Admin invite secret not configured'
      })
    }

    const headerSecret = req.headers['x-admin-invite-secret']
    if (headerSecret !== ADMIN_INVITE_SECRET) {
      return res.status(401).json({
        error: 'Unauthorized - Invalid admin invite secret'
      })
    }

    const { email, role = 'admin' } = req.body

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        error: 'Valid email address is required'
      })
    }

    // Validate role
    if (!['user', 'admin', 'super_admin'].includes(role)) {
      return res.status(400).json({
        error: 'Invalid role. Must be user, admin, or super_admin'
      })
    }

    // Generate a secure password
    const password = Math.random().toString(36).slice(-12) + 
                    Math.random().toString(36).toUpperCase().slice(-4) + 
                    Math.floor(Math.random() * 10) + 
                    '!'

    // Create user via Supabase
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role }
    })

    if (createError) {
      console.error('User creation error:', createError)
      return res.status(400).json({
        error: createError.message
      })
    }

    // Create profile record
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userData.user.id,
        email: userData.user.email,
        role
      })

    if (profileError) {
      console.error('Profile creation error:', profileError)
      // Try to delete the user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(userData.user.id)
      
      return res.status(500).json({
        error: 'Failed to create user profile'
      })
    }

    // If it's an admin role, create admin record
    if (role === 'admin' || role === 'super_admin') {
      const { error: adminError } = await supabaseAdmin
        .from('admins')
        .insert({
          id: userData.user.id,
          email: userData.user.email,
          permissions: { all: true }
        })

      if (adminError) {
        console.error('Admin record creation error:', adminError)
        // Don't fail the whole operation for this
      }
    }

    // Return success with user info (without password)
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: userData.user.id,
        email: userData.user.email,
        role,
        created_at: userData.user.created_at
      },
      temporaryPassword: password,
      note: 'User should change password on first login'
    })

  } catch (error) {
    console.error('Admin invite error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}
