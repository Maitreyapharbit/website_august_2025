import { supabaseAdmin } from '@/lib/supabase'

const ADMIN_INVITE_SECRET = process.env.ADMIN_INVITE_SECRET

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Verify admin invite secret
    const authHeader = req.headers.authorization
    if (!authHeader || authHeader !== `Bearer ${ADMIN_INVITE_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const { email, role = 'admin' } = req.body

    // Validate input
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' })
    }

    if (!['admin', 'super_admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role. Must be admin or super_admin' })
    }

    // Generate a secure password
    const password = Math.random().toString(36).slice(-12) + Math.random().toString(36).toUpperCase().slice(-4) + '!1'

    // Create user via Supabase
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role }
    })

    if (createError) {
      return res.status(400).json({ error: createError.message })
    }

    // Create profile record
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userData.user.id,
        email,
        role
      })

    if (profileError) {
      // Attempt to delete the created user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(userData.user.id)
      return res.status(500).json({ error: 'Failed to create user profile' })
    }

    // If it's an admin role, create admin record
    if (role === 'admin' || role === 'super_admin') {
      const { error: adminError } = await supabaseAdmin
        .from('admins')
        .insert({
          id: userData.user.id,
          email,
          permissions: role === 'super_admin' ? { all: true, super_admin: true } : { admin: true }
        })

      if (adminError) {
        console.error('Admin record creation failed:', adminError)
        // Don't fail the request, but log the error
      }
    }

    // Return success with user info (without password)
    return res.status(201).json({
      success: true,
      user: {
        id: userData.user.id,
        email: userData.user.email,
        role
      },
      message: `Admin user created successfully. Temporary password: ${password}`
    })

  } catch (error) {
    console.error('Admin invite error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
