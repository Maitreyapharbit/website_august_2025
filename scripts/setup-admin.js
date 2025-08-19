const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

async function setupAdminUser() {
  try {
    console.log('Setting up admin user...');
    
    // Check if admin user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('email', 'admin@pharbit.com')
      .single();
    
    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }
    
    // Hash the password
    const passwordHash = await bcrypt.hash('F#034180427932al', 10);
    
    // Create admin user
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email: 'admin@pharbit.com',
        password_hash: passwordHash,
        role: 'ADMIN',
        first_name: 'Admin',
        last_name: 'User',
        is_verified: true,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating admin user:', error);
      return;
    }
    
    console.log('Admin user created successfully:', {
      id: user.id,
      email: user.email,
      role: user.role
    });
    
  } catch (error) {
    console.error('Error setting up admin user:', error);
  }
}

// Run the setup
setupAdminUser();