"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../config/database");
const environment_1 = require("../config/environment");
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../config/logger");
class AuthService {
    static async login(email, password) {
        try {
            const { data: user, error } = await database_1.supabaseAdmin
                .from('admins')
                .select('*')
                .eq('email', email)
                .single();
            if (error || !user) {
                throw new errorHandler_1.ApiError(401, 'Invalid credentials');
            }
            const isValidPassword = await bcryptjs_1.default.compare(password, user.password_hash);
            if (!isValidPassword) {
                throw new errorHandler_1.ApiError(401, 'Invalid credentials');
            }
            const payload = {
                userId: user.id,
                email: user.email
            };
            const token = jsonwebtoken_1.default.sign(payload, environment_1.config.JWT_SECRET, { expiresIn: '24h' });
            logger_1.logger.info('User logged in successfully', { userId: user.id, email: user.email });
            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    created_at: user.created_at
                }
            };
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            logger_1.logger.error('Login error:', error);
            throw new errorHandler_1.ApiError(500, 'Login failed');
        }
    }
    static async verifyToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, environment_1.config.JWT_SECRET);
            const { data: user, error } = await database_1.supabaseAdmin
                .from('admins')
                .select('id, email')
                .eq('id', decoded.userId)
                .single();
            if (error || !user) {
                throw new errorHandler_1.ApiError(401, 'User not found');
            }
            return decoded;
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            throw new errorHandler_1.ApiError(401, 'Invalid token');
        }
    }
    static async createAdminUser(email, password) {
        try {
            const { data: existing } = await database_1.supabaseAdmin
                .from('admins')
                .select('id')
                .eq('email', email)
                .single();
            if (existing) {
                throw new errorHandler_1.ApiError(409, 'Admin user already exists');
            }
            const saltRounds = 12;
            const passwordHash = await bcryptjs_1.default.hash(password, saltRounds);
            const { data: admin, error } = await database_1.supabaseAdmin
                .from('admins')
                .insert({
                email,
                password_hash: passwordHash
            })
                .select()
                .single();
            if (error) {
                throw new errorHandler_1.ApiError(500, 'Failed to create admin user');
            }
            logger_1.logger.info('Admin user created successfully', { email });
            return admin;
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            logger_1.logger.error('Create admin error:', error);
            throw new errorHandler_1.ApiError(500, 'Failed to create admin user');
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=authService.js.map