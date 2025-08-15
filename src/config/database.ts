import { createClient } from '@supabase/supabase-js';
import { env } from './env';
import { logger } from './logger';
import { Database } from '../types/database.types';

// Create Supabase client with proper typing
export const supabase = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_ANON_KEY,
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

// Create admin client for operations requiring elevated permissions
export const supabaseAdmin = createClient<Database>(
  env.SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    db: {
      schema: 'public',
    },
  }
);

// Health check function for Supabase
export async function testDatabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('count')
      .limit(1);
    
    if (error) {
      logger.error('Supabase health check failed', { error: error.message });
      return false;
    }
    
    logger.info('Database connection successful');
    return true;
  } catch (error) {
    logger.error('Database connection failed', { error });
    return false;
  }
}

// Initialize Supabase connection
export async function initializeDatabase() {
  try {
    const isHealthy = await testDatabaseConnection();
    if (isHealthy) {
      logger.info('Database initialized successfully');
    } else {
      logger.warn('Database health check failed during initialization');
    }
    return supabase;
  } catch (error) {
    logger.error('Failed to initialize database', { error });
    throw error;
  }
}