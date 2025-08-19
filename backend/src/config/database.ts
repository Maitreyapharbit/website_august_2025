import { createClient } from '@supabase/supabase-js';
import { config } from './environment';
import { logger } from './logger';

// Create Supabase client for general operations
export const supabase = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

// Create Supabase admin client for admin operations
export const supabaseAdmin = createClient(
  config.SUPABASE_URL,
  config.SUPABASE_SERVICE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

export async function initializeDatabase() {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('blogs')
      .select('count')
      .limit(1);
    
    if (error) {
      logger.warn('Database connection test failed:', error.message);
      logger.warn('Make sure your Supabase credentials are correct and tables exist');
    } else {
      logger.info('✅ Database connection successful');
    }
  } catch (error) {
    logger.error('Database initialization failed:', error);
    throw error;
  }
}