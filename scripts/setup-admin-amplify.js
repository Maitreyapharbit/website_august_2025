const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Load environment variables
require('dotenv').config();

// Create Supabase admin client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
);

async function setupAdminUser() {
  try {
    console.log('🔧 Setting up admin user for AWS Amplify deployment...');
    
    const email = 'admin@pharbit.com';
    const password = 'F#0341804279321';
    
    // Check if admin user already exists
    const { data: existingAdmin } = await supabase
      .from('admins')
      .select('id')
      .eq('email', email)
      .single();
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists');
      console.log('📧 Email:', email);
      console.log('🔑 Password:', password);
      return;
    }
    
    // Hash the password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    // Create admin user
    const { data: admin, error } = await supabase
      .from('admins')
      .insert({
        email,
        password_hash: passwordHash,
        created_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('❌ Error creating admin user:', error);
      return;
    }
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('🆔 User ID:', admin.id);
    console.log('');
    console.log('🌐 You can now login at:');
    console.log('   https://main.d22x4oiromio4y.amplifyapp.com/admin/login');
    
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run the setup
setupAdminUser();