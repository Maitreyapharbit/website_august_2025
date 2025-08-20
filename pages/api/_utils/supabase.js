import { createClient } from '@supabase/supabase-js';

// Initialize Supabase clients
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

// Public client (for read operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (for write operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Check if Supabase is properly configured
 */
export function isSupabaseConfigured() {
  return !!(supabaseUrl && supabaseAnonKey);
}

/**
 * Check if admin operations are available
 */
export function isAdminConfigured() {
  return !!(supabaseUrl && supabaseServiceKey);
}