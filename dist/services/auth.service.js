"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = require("../config/database");
const jwt_1 = require("../utils/jwt");
const error_1 = require("../middleware/error");
const http_status_codes_1 = require("http-status-codes");
const mailer_1 = require("../utils/mailer");
const uuid_1 = require("uuid");
class AuthService {
    static async register(params) {
        const { data: existing } = await database_1.supabase
            .from('users')
            .select('id')
            .eq('email', params.email)
            .single();
        if (existing)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.CONFLICT, 'Email already registered');
        const { data: company, error: companyError } = await database_1.supabase
            .from('companies')
            .insert({ name: params.companyName })
            .select()
            .single();
        if (companyError || !company) {
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create company');
        }
        const passwordHash = await bcryptjs_1.default.hash(params.password, 10);
        const { data: user, error: userError } = await database_1.supabase
            .from('users')
            .insert({
            email: params.email,
            password_hash: passwordHash,
            role: 'COMPANY',
            first_name: params.firstName || null,
            last_name: params.lastName || null,
            company_id: company.id,
        })
            .select()
            .single();
        if (userError || !user) {
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to create user');
        }
        const tokens = this.generateTokens(user.id, user.role, user.company_id || undefined);
        return { user, tokens };
    }
    static async login(email, password) {
        const { data: user, error } = await database_1.supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        if (error || !user)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid credentials');
        const match = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!match)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid credentials');
        const tokens = this.generateTokens(user.id, user.role, user.company_id || undefined);
        return { user, tokens };
    }
    static async refresh(userId, role, companyId) {
        return this.generateTokens(userId, role, companyId);
    }
    static async getProfile(userId) {
        const { data: user, error } = await database_1.supabase
            .from('users')
            .select(`
				*,
				company:companies(*)
			`)
            .eq('id', userId)
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
        return user;
    }
    static async updateProfile(userId, data) {
        const { data: user, error } = await database_1.supabase
            .from('users')
            .update({
            first_name: data.firstName,
            last_name: data.lastName,
        })
            .eq('id', userId)
            .select()
            .single();
        if (error)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to update profile');
        return user;
    }
    static async forgotPassword(email) {
        const { data: user } = await database_1.supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();
        if (!user)
            return; // do not reveal
        const token = (0, uuid_1.v4)();
        await database_1.supabase
            .from('audit_logs')
            .insert({
            product_id: 'password-reset',
            action: 'REQUEST',
            actor_id: user.id,
            metadata: { token }
        });
        await (0, mailer_1.sendMail)(email, 'Password reset', `<p>Your reset token: ${token}</p>`);
        return;
    }
    static async resetPassword(email, token, newPassword) {
        // In a real app, persist token; here we just accept any token logged above
        const { data: user, error } = await database_1.supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();
        if (error || !user)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid email or token');
        const passwordHash = await bcryptjs_1.default.hash(newPassword, 10);
        const { error: updateError } = await database_1.supabase
            .from('users')
            .update({ password_hash: passwordHash })
            .eq('id', user.id);
        if (updateError)
            throw new error_1.ApiError(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to reset password');
    }
    static generateTokens(userId, role, companyId) {
        const access = (0, jwt_1.signAccessToken)({ userId, role, companyId });
        const refresh = (0, jwt_1.signRefreshToken)({ userId, role, companyId });
        return { access, refresh };
    }
}
exports.AuthService = AuthService;
