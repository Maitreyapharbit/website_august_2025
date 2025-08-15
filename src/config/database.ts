import { createClient } from '@supabase/supabase-js';
import { env } from './env';
import { logger } from './logger';
import { Database } from '../types/database.types';

// Validate required Supabase environment variables
function validateSupabaseConfig() {
  const requiredVars = {
    SUPABASE_URL: env.SUPABASE_URL,
    SUPABASE_ANON_KEY: env.SUPABASE_ANON_KEY,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    logger.error(`Missing required Supabase configuration: ${missingVars.join(', ')}`);
    return false;
  }

  if (!env.SUPABASE_SERVICE_ROLE_KEY) {
    logger.warn('SUPABASE_SERVICE_ROLE_KEY not configured. Admin operations will be disabled.');
  }

  return true;
}

const isSupabaseConfigured = validateSupabaseConfig();

// Create Supabase client with proper typing
export const supabase = isSupabaseConfigured 
  ? createClient<Database>(
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
    )
  : null;

// Create admin client for operations requiring elevated permissions
export const supabaseAdmin = isSupabaseConfigured
  ? createClient<Database>(
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
    )
  : null;

// Health check function for Supabase
export async function testDatabaseConnection(): Promise<boolean> {
  if (!supabase) {
    logger.warn('Supabase client not configured. Skipping database connection test.');
    return false;
  }

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
  if (!isSupabaseConfigured) {
    logger.warn('Supabase not configured. Database operations will be disabled.');
    return null;
  }

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