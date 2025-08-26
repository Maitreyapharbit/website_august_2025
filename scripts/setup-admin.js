#!/usr/bin/env node

/**
 * Admin System Setup Script
 * This script creates the first admin user and initializes the admin system
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing required environment variables:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL')
  console.error('   SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function setupAdmin() {
  try {
    console.log('🚀 Setting up admin system...')
    console.log('📡 Connecting to Supabase...')

    // Check if admin already exists
    const { data: existingAdmins, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .in('role', ['admin', 'super_admin'])
      .limit(1)

    if (checkError) {
      console.error('❌ Error checking existing admins:', checkError.message)
      process.exit(1)
    }

    if (existingAdmins && existingAdmins.length > 0) {
      console.log('✅ Admin user already exists:', existingAdmins[0].email)
      console.log('   Role:', existingAdmins[0].role)
      return
    }

    // Create admin user
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@pharbit.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!'

    console.log(`📧 Creating super admin user: ${adminEmail}`)

    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { role: 'super_admin' }
    })

    if (createError) {
      console.error('❌ Error creating admin user:', createError.message)
      process.exit(1)
    }

    console.log('✅ User created successfully, updating profile...')

    // Update profile to super_admin role
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: 'super_admin' })
      .eq('id', userData.user.id)

    if (updateError) {
      console.error('❌ Error updating profile role:', updateError.message)
      process.exit(1)
    }

    // Create admin record
    const { error: adminError } = await supabase
      .from('admins')
      .insert({
        id: userData.user.id,
        email: adminEmail,
        permissions: { all: true, super_admin: true }
      })

    if (adminError) {
      console.error('❌ Error creating admin record:', adminError.message)
      process.exit(1)
    }

    console.log('✅ Admin user created successfully!')
    console.log('')
    console.log('📋 Login Credentials:')
    console.log(`   Email: ${adminEmail}`)
    console.log(`   Password: ${adminPassword}`)
    console.log('')
    console.log('🔐 You can now sign in at: http://localhost:3000/admin/login')
    console.log('⚠️  Remember to change the password after first login!')
    console.log('')
    console.log('🎯 Next steps:')
    console.log('   1. Start your development server: npm run dev')
    console.log('   2. Visit /admin/login')
    console.log('   3. Sign in with the credentials above')
    console.log('   4. Access the admin dashboard at /admin')

  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
    console.error('Stack trace:', error.stack)
    process.exit(1)
  }
}

// Run setup
setupAdmin()
