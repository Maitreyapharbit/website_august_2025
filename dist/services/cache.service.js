"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const logger_1 = require("../config/logger");
/**
 * In-memory cache service to replace Redis functionality
 */
class InMemoryCache {
    constructor() {
        this.cache = new Map();
        // Clean up expired entries every 5 minutes
        this.cleanupInterval = setInterval(() => {
            this.cleanup();
        }, 5 * 60 * 1000);
    }
    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (entry.expires && entry.expires < now) {
                this.cache.delete(key);
            }
        }
    }
    set(key, value, ttlSeconds) {
        try {
            const expires = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : undefined;
            this.cache.set(key, { value, expires });
            return true;
        }
        catch (error) {
            logger_1.logger.error('Cache SET error', { key, error });
            return false;
        }
    }
    get(key) {
        try {
            const entry = this.cache.get(key);
            if (!entry)
                return null;
            if (entry.expires && entry.expires < Date.now()) {
                this.cache.delete(key);
                return null;
            }
            return entry.value;
        }
        catch (error) {
            logger_1.logger.error('Cache GET error', { key, error });
            return null;
        }
    }
    del(key) {
        try {
            return this.cache.delete(key);
        }
        catch (error) {
            logger_1.logger.error('Cache DEL error', { key, error });
            return false;
        }
    }
    exists(key) {
        try {
            const entry = this.cache.get(key);
            if (!entry)
                return false;
            if (entry.expires && entry.expires < Date.now()) {
                this.cache.delete(key);
                return false;
            }
            return true;
        }
        catch (error) {
            logger_1.logger.error('Cache EXISTS error', { key, error });
            return false;
        }
    }
    expire(key, ttlSeconds) {
        try {
            const entry = this.cache.get(key);
            if (!entry)
                return false;
            entry.expires = Date.now() + (ttlSeconds * 1000);
            return true;
        }
        catch (error) {
            logger_1.logger.error('Cache EXPIRE error', { key, error });
            return false;
        }
    }
    clear() {
        this.cache.clear();
    }
    size() {
        return this.cache.size;
    }
    destroy() {
        if (this.cleanupInterval) {
            clearInterval(this.cleanupInterval);
        }
        this.cache.clear();
    }
}
// Create singleton instance
const memoryCache = new InMemoryCache();
class CacheService {
    /**
     * Generate cache key with prefix
     */
    static getKey(key) {
        return `${this.CACHE_PREFIX}${key}`;
    }
    /**
     * Cache user profile data
     */
    static async cacheUserProfile(userId, profile, ttl = this.DEFAULT_TTL) {
        const key = this.getKey(`user:${userId}`);
        const success = memoryCache.set(key, JSON.stringify(profile), ttl);
        if (!success) {
            logger_1.logger.warn('Failed to cache user profile', { userId });
        }
    }
    /**
     * Get cached user profile
     */
    static async getCachedUserProfile(userId) {
        const key = this.getKey(`user:${userId}`);
        const cached = memoryCache.get(key);
        if (cached) {
            try {
                return JSON.parse(cached);
            }
            catch (error) {
                logger_1.logger.error('Failed to parse cached user profile', { userId, error });
                memoryCache.del(key); // Remove corrupted cache
            }
        }
        return null;
    }
    /**
     * Cache company data
     */
    static async cacheCompanyData(companyId, data, ttl = this.DEFAULT_TTL) {
        const key = this.getKey(`company:${companyId}`);
        const success = memoryCache.set(key, JSON.stringify(data), ttl);
        if (!success) {
            logger_1.logger.warn('Failed to cache company data', { companyId });
        }
    }
    /**
     * Get cached company data
     */
    static async getCachedCompanyData(companyId) {
        const key = this.getKey(`company:${companyId}`);
        const cached = memoryCache.get(key);
        if (cached) {
            try {
                return JSON.parse(cached);
            }
            catch (error) {
                logger_1.logger.error('Failed to parse cached company data', { companyId, error });
                memoryCache.del(key);
            }
        }
        return null;
    }
    /**
     * Cache sensor readings for quick access
     */
    static async cacheSensorReadings(sensorId, readings, ttl = 1800) {
        const key = this.getKey(`sensor:readings:${sensorId}`);
        const success = memoryCache.set(key, JSON.stringify(readings), ttl);
        if (!success) {
            logger_1.logger.warn('Failed to cache sensor readings', { sensorId });
        }
    }
    /**
     * Get cached sensor readings
     */
    static async getCachedSensorReadings(sensorId) {
        const key = this.getKey(`sensor:readings:${sensorId}`);
        const cached = memoryCache.get(key);
        if (cached) {
            try {
                return JSON.parse(cached);
            }
            catch (error) {
                logger_1.logger.error('Failed to parse cached sensor readings', { sensorId, error });
                memoryCache.del(key);
            }
        }
        return null;
    }
    /**
     * Cache analytics data
     */
    static async cacheAnalytics(companyId, type, data, ttl = 900) {
        const key = this.getKey(`analytics:${companyId}:${type}`);
        const success = memoryCache.set(key, JSON.stringify(data), ttl);
        if (!success) {
            logger_1.logger.warn('Failed to cache analytics data', { companyId, type });
        }
    }
    /**
     * Get cached analytics data
     */
    static async getCachedAnalytics(companyId, type) {
        const key = this.getKey(`analytics:${companyId}:${type}`);
        const cached = memoryCache.get(key);
        if (cached) {
            try {
                return JSON.parse(cached);
            }
            catch (error) {
                logger_1.logger.error('Failed to parse cached analytics data', { companyId, type, error });
                memoryCache.del(key);
            }
        }
        return null;
    }
    /**
     * Invalidate user cache
     */
    static async invalidateUserCache(userId) {
        const key = this.getKey(`user:${userId}`);
        memoryCache.del(key);
    }
    /**
     * Invalidate company cache
     */
    static async invalidateCompanyCache(companyId) {
        const key = this.getKey(`company:${companyId}`);
        memoryCache.del(key);
    }
    /**
     * Invalidate sensor cache
     */
    static async invalidateSensorCache(sensorId) {
        const key = this.getKey(`sensor:readings:${sensorId}`);
        memoryCache.del(key);
    }
    /**
     * Set rate limiting data
     */
    static async setRateLimit(identifier, count, windowSeconds) {
        const key = this.getKey(`ratelimit:${identifier}`);
        memoryCache.set(key, count.toString(), windowSeconds);
    }
    /**
     * Get rate limiting data
     */
    static async getRateLimit(identifier) {
        const key = this.getKey(`ratelimit:${identifier}`);
        const cached = memoryCache.get(key);
        return cached ? parseInt(cached, 10) : 0;
    }
    /**
     * Store temporary data (like password reset tokens)
     */
    static async setTemporary(key, data, ttlSeconds) {
        const cacheKey = this.getKey(`temp:${key}`);
        memoryCache.set(cacheKey, JSON.stringify(data), ttlSeconds);
    }
    /**
     * Get temporary data
     */
    static async getTemporary(key) {
        const cacheKey = this.getKey(`temp:${key}`);
        const cached = memoryCache.get(key);
        if (cached) {
            try {
                return JSON.parse(cached);
            }
            catch (error) {
                logger_1.logger.error('Failed to parse temporary data', { key, error });
                memoryCache.del(cacheKey);
            }
        }
        return null;
    }
    /**
     * Remove temporary data
     */
    static async removeTemporary(key) {
        const cacheKey = this.getKey(`temp:${key}`);
        memoryCache.del(cacheKey);
    }
    /**
     * Get cache statistics
     */
    static getStats() {
        return {
            size: memoryCache.size(),
            type: 'in-memory'
        };
    }
    /**
     * Clear all cache
     */
    static clearAll() {
        memoryCache.clear();
    }
}
exports.CacheService = CacheService;
CacheService.DEFAULT_TTL = 3600; // 1 hour
CacheService.CACHE_PREFIX = 'pharbit:cache:';
// Graceful shutdown
process.on('SIGTERM', () => {
    memoryCache.destroy();
});
process.on('SIGINT', () => {
    memoryCache.destroy();
});
