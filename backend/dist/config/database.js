"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseAdmin = exports.supabase = void 0;
exports.initializeDatabase = initializeDatabase;
const supabase_js_1 = require("@supabase/supabase-js");
const environment_1 = require("./environment");
const logger_1 = require("./logger");
exports.supabase = (0, supabase_js_1.createClient)(environment_1.config.SUPABASE_URL, environment_1.config.SUPABASE_ANON_KEY, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});
exports.supabaseAdmin = (0, supabase_js_1.createClient)(environment_1.config.SUPABASE_URL, environment_1.config.SUPABASE_SERVICE_KEY, {
    auth: {
        persistSession: false,
        autoRefreshToken: false
    }
});
async function initializeDatabase() {
    try {
        const { data, error } = await exports.supabase
            .from('blogs')
            .select('count')
            .limit(1);
        if (error) {
            logger_1.logger.warn('Database connection test failed:', error.message);
            logger_1.logger.warn('Make sure your Supabase credentials are correct and tables exist');
        }
        else {
            logger_1.logger.info('✅ Database connection successful');
        }
    }
    catch (error) {
        logger_1.logger.error('Database initialization failed:', error);
        throw error;
    }
}
//# sourceMappingURL=database.js.map