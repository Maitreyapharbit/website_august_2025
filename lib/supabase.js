import { createClient } from '@supabase/supabase-js';

// Environment variable validation
function validateSupabaseConfig() {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl) {
    throw new Error('Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL environment variable');
  }
  
  if (!supabaseAnonKey) {
    throw new Error('Missing SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
  }
  
  return { supabaseUrl, supabaseAnonKey };
}

// Create Supabase client for public operations
export function createSupabaseClient() {
  try {
    const { supabaseUrl, supabaseAnonKey } = validateSupabaseConfig();
    
    return createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  } catch (error) {
    console.error('Supabase configuration error:', error.message);
    throw error;
  }
}

// Create Supabase admin client for protected operations
export function createSupabaseAdminClient() {
  try {
    const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                               process.env.SUPABASE_ANON_KEY || 
                               process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl) {
      throw new Error('Missing SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL environment variable');
    }
    
    if (!supabaseServiceKey) {
      throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
    }
    
    return createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
  } catch (error) {
    console.error('Supabase admin configuration error:', error.message);
    throw error;
  }
}

// Default exports
export const supabase = createSupabaseClient();
export const supabaseAdmin = createSupabaseAdminClient();