"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function parseNumber(value, defaultValue) {
    if (!value)
        return defaultValue;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : defaultValue;
}
function parseBoolean(value, defaultValue) {
    if (value === undefined)
        return defaultValue;
    return value === 'true' || value === '1';
}
function parseCsv(value, defaultValue) {
    if (!value)
        return defaultValue;
    return value.split(',').map((v) => {
        const trimmed = v.trim();
        if (trimmed.startsWith('/') && trimmed.endsWith('/')) {
            return new RegExp(trimmed.slice(1, -1));
        }
        return trimmed;
    });
}
exports.env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: parseNumber(process.env.PORT, 4000),
    BASE_URL: process.env.BASE_URL || 'http://localhost:4000',
    // Supabase configuration
    SUPABASE_URL: process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || undefined,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || undefined,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || undefined,
    SESSION_SECRET: process.env.SESSION_SECRET || 'change_me',
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'change_me_access',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'change_me_refresh',
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || '15m',
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || '7d',
    SMTP_HOST: process.env.SMTP_HOST || 'localhost',
    SMTP_PORT: parseNumber(process.env.SMTP_PORT, 1025),
    SMTP_SECURE: parseBoolean(process.env.SMTP_SECURE, false),
    SMTP_USER: process.env.SMTP_USER || '',
    SMTP_PASS: process.env.SMTP_PASS || '',
    SMTP_FROM: process.env.SMTP_FROM || 'Pharbit <no-reply@pharbit.io>',
    CORS_ORIGINS: parseCsv(process.env.CORS_ORIGINS, ['http://localhost:5173', 'http://localhost:3000']),
    RATE_LIMIT_WINDOW_MINUTES: parseNumber(process.env.RATE_LIMIT_WINDOW_MINUTES, 15),
    RATE_LIMIT_MAX: parseNumber(process.env.RATE_LIMIT_MAX, 100),
    UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
    SWAGGER_TITLE: process.env.SWAGGER_TITLE || 'Pharbit API',
    SWAGGER_VERSION: process.env.SWAGGER_VERSION || '1.0.0',
    SWAGGER_DESCRIPTION: process.env.SWAGGER_DESCRIPTION || 'Pharbit blockchain-based pharmaceutical supply chain API',
};
