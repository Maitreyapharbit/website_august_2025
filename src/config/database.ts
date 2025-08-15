import { createClient } from '@supabase/supabase-js';
import { env } from './env';
import { logger } from './logger';
import { Database } from '../types/database.types';

// Validate required environment variables
function validateEnvironment() {
  const errors: string[] = [];
  
  if (!env.SUPABASE_URL) {
    errors.push('SUPABASE_URL is required');
  }
  
  if (!env.SUPABASE_ANON_KEY) {
    errors.push('SUPABASE_ANON_KEY is required');
  }
  
  if (!env.SESSION_SECRET || env.SESSION_SECRET === 'change_me') {
    errors.push('SESSION_SECRET must be set to a secure value');
  }
  
  if (!env.JWT_ACCESS_SECRET || env.JWT_ACCESS_SECRET === 'change_me_access') {
    errors.push('JWT_ACCESS_SECRET must be set to a secure value');
  }
  
  if (!env.JWT_REFRESH_SECRET || env.JWT_REFRESH_SECRET === 'change_me_refresh') {
    errors.push('JWT_REFRESH_SECRET must be set to a secure value');
  }
  
  if (errors.length > 0) {
    logger.warn('Environment validation warnings:', { errors });
    logger.warn('Please check your .env file and ensure all required variables are set.');
    logger.warn('See .env.example for reference.');
    // Don't throw error in development, just warn
    if (env.NODE_ENV === 'production') {
      throw new Error(`Environment validation failed: ${errors.join(', ')}`);
    }
  }
}

// Validate required Supabase environment variables
function validateSupabaseConfig() {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    logger.error('Missing required Supabase configuration');
    return false;
  }

  // Validate URL format
  try {
    new URL(env.SUPABASE_URL);
  } catch (error) {
    logger.error('Invalid SUPABASE_URL format');
    return false;
  }

  // Validate JWT token format (basic check)
  if (!env.SUPABASE_ANON_KEY.startsWith('eyJ')) {
    logger.error('Invalid SUPABASE_ANON_KEY format');
    return false;
  }

  return true;
}

// Validate environment on module load
validateEnvironment();

const isSupabaseConfigured = validateSupabaseConfig();

// Create Supabase client with proper typing
export const supabase = isSupabaseConfigured 
  ? createClient<Database>(
      env.SUPABASE_URL!,
      env.SUPABASE_ANON_KEY!,
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
  : (() => {
      logger.error('Supabase not configured. Cannot create client.');
      throw new Error('Supabase configuration is required');
    })();

// Create admin client for operations requiring elevated permissions
export const supabaseAdmin = isSupabaseConfigured && env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient<Database>(
      env.SUPABASE_URL!,
      env.SUPABASE_SERVICE_ROLE_KEY!,
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
  : (() => {
      logger.warn('Supabase admin not configured. Admin operations will be disabled.');
      return null;
    })();

// Health check function for Supabase
export async function testDatabaseConnection(): Promise<boolean> {
  if (!isSupabaseConfigured) {
    logger.warn('Supabase client not configured. Skipping database connection test.');
    return false;
  }

  try {
    // Use a lightweight auth operation to test the connection
    // This doesn't require any specific tables to exist
    const { data, error } = await supabase.auth.getSession();
    
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
    return supabase;
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