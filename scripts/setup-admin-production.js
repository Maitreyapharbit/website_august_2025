#!/usr/bin/env node

/**
 * Setup Admin User for Production
 * Creates the admin user in Supabase database
 */

const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function setupAdmin() {
  console.log('🚀 Setting up Pharbit admin user...');

  // Check environment variables
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing Supabase configuration');
    console.error('Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment variables');
    process.exit(1);
  }

  // Initialize Supabase admin client
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Admin credentials
    const adminEmail = 'admin@pharbit.com';
    const adminPassword = 'F#034180427932al';

    // Hash password
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    // Check if admin already exists
    const { data: existingAdmin } = await supabase
      .from('admins')
      .select('id, email')
      .eq('email', adminEmail)
      .single();

    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      console.log(`📧 Email: ${adminEmail}`);
      console.log(`🔑 Password: ${adminPassword}`);
      return;
    }

    // Create admin user
    const { data: admin, error } = await supabase
      .from('admins')
      .insert({
        email: adminEmail,
        password_hash: passwordHash
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Failed to create admin user:', error.message);
      process.exit(1);
    }

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', adminEmail);
    console.log('🔑 Password:', adminPassword);
    console.log('🆔 Admin ID:', admin.id);
    console.log('');
    console.log('🎯 You can now login at: /admin/login');
    console.log('');
    console.log('⚠️  IMPORTANT: Change the default password after first login!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupAdmin().catch(console.error);