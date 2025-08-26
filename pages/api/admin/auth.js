import { supabaseAdmin } from '@/lib/supabase'

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get the authorization header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' })
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify the JWT token
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !user) {
      return res.status(401).json({ error: 'Invalid token' })
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return res.status(404).json({ error: 'User profile not found' })
    }

    // Check if user has admin role
    if (profile.role !== 'admin' && profile.role !== 'super_admin') {
      return res.status(403).json({ error: 'Access denied. Admin privileges required.' })
    }

    // Return user info and admin status
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        role: profile.role,
        created_at: user.created_at
      },
      isAdmin: true,
      permissions: profile.role === 'super_admin' ? ['all'] : ['admin']
    })

  } catch (error) {
    console.error('Admin auth validation error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
