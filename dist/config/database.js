"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseAdmin = exports.supabase = void 0;
exports.testDatabaseConnection = testDatabaseConnection;
exports.initializeDatabase = initializeDatabase;
const supabase_js_1 = require("@supabase/supabase-js");
const env_1 = require("./env");
const logger_1 = require("./logger");
// Validate required environment variables
function validateEnvironment() {
    const errors = [];
    if (!env_1.env.SUPABASE_URL) {
        errors.push('SUPABASE_URL is required');
    }
    if (!env_1.env.SUPABASE_ANON_KEY) {
        errors.push('SUPABASE_ANON_KEY is required');
    }
    if (!env_1.env.SESSION_SECRET || env_1.env.SESSION_SECRET === 'change_me') {
        errors.push('SESSION_SECRET must be set to a secure value');
    }
    if (!env_1.env.JWT_ACCESS_SECRET || env_1.env.JWT_ACCESS_SECRET === 'change_me_access') {
        errors.push('JWT_ACCESS_SECRET must be set to a secure value');
    }
    if (!env_1.env.JWT_REFRESH_SECRET || env_1.env.JWT_REFRESH_SECRET === 'change_me_refresh') {
        errors.push('JWT_REFRESH_SECRET must be set to a secure value');
    }
    if (errors.length > 0) {
        logger_1.logger.warn('Environment validation warnings:', { errors });
        logger_1.logger.warn('Please check your .env file and ensure all required variables are set.');
        logger_1.logger.warn('See .env.example for reference.');
        // Don't throw error in development, just warn
        if (env_1.env.NODE_ENV === 'production') {
            throw new Error(`Environment validation failed: ${errors.join(', ')}`);
        }
    }
}
// Validate required Supabase environment variables
function validateSupabaseConfig() {
    if (!env_1.env.SUPABASE_URL || !env_1.env.SUPABASE_ANON_KEY) {
        logger_1.logger.error('Missing required Supabase configuration');
        return false;
    }
    // Validate URL format
    try {
        new URL(env_1.env.SUPABASE_URL);
    }
    catch (error) {
        logger_1.logger.error('Invalid SUPABASE_URL format');
        return false;
    }
    // Validate JWT token format (basic check)
    if (!env_1.env.SUPABASE_ANON_KEY.startsWith('eyJ')) {
        logger_1.logger.error('Invalid SUPABASE_ANON_KEY format');
        return false;
    }
    return true;
}
// Validate environment on module load
validateEnvironment();
const isSupabaseConfigured = validateSupabaseConfig();
// Create Supabase client with proper typing
exports.supabase = isSupabaseConfigured
    ? (0, supabase_js_1.createClient)(env_1.env.SUPABASE_URL, env_1.env.SUPABASE_ANON_KEY, {
        auth: {
            persistSession: false, // We handle auth via JWT
            autoRefreshToken: false,
        },
        db: {
            schema: 'public',
        },
    })
    : (() => {
        logger_1.logger.error('Supabase not configured. Cannot create client.');
        throw new Error('Supabase configuration is required');
    })();
// Create admin client for operations requiring elevated permissions
exports.supabaseAdmin = isSupabaseConfigured && env_1.env.SUPABASE_SERVICE_ROLE_KEY
    ? (0, supabase_js_1.createClient)(env_1.env.SUPABASE_URL, env_1.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
        db: {
            schema: 'public',
        },
    })
    : (() => {
        logger_1.logger.warn('Supabase admin not configured. Admin operations will be disabled.');
        return null;
    })();
// Health check function for Supabase
async function testDatabaseConnection() {
    if (!isSupabaseConfigured) {
        logger_1.logger.warn('Supabase client not configured. Skipping database connection test.');
        return false;
    }
    try {
        // Use a lightweight auth operation to test the connection
        // This doesn't require any specific tables to exist
        const { data, error } = await exports.supabase.auth.getSession();
        if (error) {
            logger_1.logger.error('Supabase health check failed', { error: error.message });
            return false;
        }
        logger_1.logger.info('Database connection successful');
        return true;
    }
    catch (error) {
        logger_1.logger.error('Database connection failed', { error });
        return false;
    }
}
// Initialize Supabase connection
async function initializeDatabase() {
    if (!isSupabaseConfigured) {
        logger_1.logger.warn('Supabase not configured. Database operations will be disabled.');
        return exports.supabase;
    }
    try {
        const isHealthy = await testDatabaseConnection();
        if (isHealthy) {
            logger_1.logger.info('Database initialized successfully');
        }
        else {
            logger_1.logger.warn('Database health check failed during initialization');
        }
        return exports.supabase;
    }
    catch (error) {
        logger_1.logger.error('Failed to initialize database', { error });
        throw error;
    }
}
