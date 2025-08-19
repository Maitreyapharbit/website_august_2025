import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '../src/config/database';
import { logger } from '../src/config/logger';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function setupAdminUser() {
  try {
    const email = 'admin@pharbit.com';
    const password = 'F#0341804279321';

    logger.info('Setting up admin user...');

    // Check if admin already exists
    const { data: existing } = await supabaseAdmin
      .from('admins')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      logger.info('Admin user already exists');
      return;
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create admin user
    const { data: admin, error } = await supabaseAdmin
      .from('admins')
      .insert({
        email,
        password_hash: passwordHash
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to create admin user:', error);
      process.exit(1);
    }

    logger.info('✅ Admin user created successfully');
    logger.info('📧 Email: admin@pharbit.com');
    logger.info('🔑 Password: F#0341804279321');
    logger.info('🆔 User ID:', admin.id);

  } catch (error) {
    logger.error('Setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setupAdminUser();