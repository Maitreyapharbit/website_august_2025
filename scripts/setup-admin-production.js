#!/usr/bin/env node

/**
 * Production Admin Setup Script for Pharbit
 * Creates the admin user in Supabase database
 */

import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const ADMIN_EMAIL = 'admin@pharbit.com';
const ADMIN_PASSWORD = 'F#034180427932al';

async function setupAdmin() {
  console.log('🚀 Setting up Pharbit admin user...');

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables:');
    console.error('   - SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL)');
    console.error('   - SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY)');
    console.error('');
    console.error('Please set these in your .env file or environment variables.');
    process.exit(1);
  }

  // Initialize Supabase admin client
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Check if admin already exists
    const { data: existingAdmin, error: checkError } = await supabase
      .from('admins')
      .select('id, email')
      .eq('email', ADMIN_EMAIL)
      .single();

    if (existingAdmin) {
      console.log('✅ Admin user already exists:', existingAdmin.email);
      console.log('📧 Email:', ADMIN_EMAIL);
      console.log('🔑 Password: F#034180427932al');
      return;
    }

    // Hash the password
    console.log('🔐 Hashing password...');
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);

    // Create admin user
    console.log('👤 Creating admin user...');
    const { data: admin, error: createError } = await supabase
      .from('admins')
      .insert({
        email: ADMIN_EMAIL,
        password_hash: passwordHash
      })
      .select()
      .single();

    if (createError) {
      console.error('❌ Failed to create admin user:', createError.message);
      process.exit(1);
    }

    console.log('✅ Admin user created successfully!');
    console.log('');
    console.log('📋 Admin Credentials:');
    console.log('   📧 Email:', ADMIN_EMAIL);
    console.log('   🔑 Password: F#034180427932al');
    console.log('   🆔 ID:', admin.id);
    console.log('');
    console.log('🎉 You can now login to the admin panel!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run the setup
setupAdmin().catch(console.error);