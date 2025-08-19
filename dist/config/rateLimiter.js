"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.limiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const cache_service_1 = require("../services/cache.service");
const env_1 = require("./env");
// Custom store using our in-memory cache
const store = {
    incr: async (key) => {
        const current = await cache_service_1.CacheService.getRateLimit(key);
        const newCount = current + 1;
        await cache_service_1.CacheService.setRateLimit(key, newCount, env_1.env.RATE_LIMIT_WINDOW_MINUTES * 60);
        return { totalHits: newCount, resetTime: new Date(Date.now() + env_1.env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000) };
    },
    decrement: async (key) => {
        const current = await cache_service_1.CacheService.getRateLimit(key);
        const newCount = Math.max(0, current - 1);
        await cache_service_1.CacheService.setRateLimit(key, newCount, env_1.env.RATE_LIMIT_WINDOW_MINUTES * 60);
    },
    resetKey: async (key) => {
        await cache_service_1.CacheService.setRateLimit(key, 0, env_1.env.RATE_LIMIT_WINDOW_MINUTES * 60);
    }
};
exports.limiter = (0, express_rate_limit_1.default)({
    windowMs: env_1.env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
    max: env_1.env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    store: store,
});
