import { createClient } from '@supabase/supabase-js';
import { env } from './env';
import { logger } from './logger';

// Create Supabase client
export const supabase = createClient(
  env.SUPABASE_URL || '',
  env.SUPABASE_ANON_KEY || '',
  {
    auth: {
      persistSession: false, // We handle auth via JWT
      autoRefreshToken: false,
    },
    db: {
      schema: 'public',
    },
  }
);

// Health check function for Supabase
export async function checkSupabaseHealth(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('User')
      .select('count')
      .limit(1);
    
    if (error) {
      logger.error('Supabase health check failed', { error: error.message });
      return false;
    }
    
    return true;
  } catch (error) {
    logger.error('Supabase health check error', { error });
    return false;
  }
}

// Initialize Supabase connection
export async function initializeSupabase() {
  try {
    const isHealthy = await checkSupabaseHealth();
    if (isHealthy) {
      logger.info('Supabase initialized successfully');
    } else {
      logger.warn('Supabase health check failed during initialization');
    }
    return supabase;
  } catch (error) {
    logger.error('Failed to initialize Supabase', { error });
    throw error;
  }
}