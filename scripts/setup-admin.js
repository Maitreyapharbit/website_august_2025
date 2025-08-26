import { createClient } from '@supabase/supabase-js'
import 'dotenv/config' // Load environment variables

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Supabase URL or Service Role Key is missing in environment variables.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
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
      console.error('❌ Error checking for existing admins:', checkError.message)
      process.exit(1)
    }

    if (existingAdmins && existingAdmins.length > 0) {
      console.log('✅ Admin user already exists:', existingAdmins[0].email)
      console.log('   Role:', existingAdmins[0].role)
      return
    }

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
      console.error('❌ Error creating user:', createError.message)
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
      // Attempt to delete the created user if profile update fails
      await supabase.auth.admin.deleteUser(userData.user.id)
      process.exit(1)
    }

    // Insert into admins table
    const { error: adminInsertError } = await supabase
      .from('admins')
      .insert({
        id: userData.user.id,
        email: adminEmail,
        permissions: { all: true, super_admin: true }
      })

    if (adminInsertError) {
      console.error('❌ Error inserting into admins table:', adminInsertError.message)
      // Attempt to delete the created user if admin record creation fails
      await supabase.auth.admin.deleteUser(userData.user.id)
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

setupAdmin()
