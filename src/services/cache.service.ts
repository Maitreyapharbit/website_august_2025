import { logger } from '../config/logger';

/**
 * In-memory cache service to replace Redis functionality
 */
class InMemoryCache {
  private cache = new Map<string, { value: any; expires?: number }>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expires && entry.expires < now) {
        this.cache.delete(key);
      }
    }
  }

  set(key: string, value: any, ttlSeconds?: number): boolean {
    try {
      const expires = ttlSeconds ? Date.now() + (ttlSeconds * 1000) : undefined;
      this.cache.set(key, { value, expires });
      return true;
    } catch (error) {
      logger.error('Cache SET error', { key, error });
      return false;
    }
  }

  get(key: string): any | null {
    try {
      const entry = this.cache.get(key);
      if (!entry) return null;
      
      if (entry.expires && entry.expires < Date.now()) {
        this.cache.delete(key);
        return null;
      }
      
      return entry.value;
    } catch (error) {
      logger.error('Cache GET error', { key, error });
      return null;
    }
  }

  del(key: string): boolean {
    try {
      return this.cache.delete(key);
    } catch (error) {
      logger.error('Cache DEL error', { key, error });
      return false;
    }
  }

  exists(key: string): boolean {
    try {
      const entry = this.cache.get(key);
      if (!entry) return false;
      
      if (entry.expires && entry.expires < Date.now()) {
        this.cache.delete(key);
        return false;
      }
      
      return true;
    } catch (error) {
      logger.error('Cache EXISTS error', { key, error });
      return false;
    }
  }

  expire(key: string, ttlSeconds: number): boolean {
    try {
      const entry = this.cache.get(key);
      if (!entry) return false;
      
      entry.expires = Date.now() + (ttlSeconds * 1000);
      return true;
    } catch (error) {
      logger.error('Cache EXPIRE error', { key, error });
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

export class CacheService {
  private static readonly DEFAULT_TTL = 3600; // 1 hour
  private static readonly CACHE_PREFIX = 'pharbit:cache:';

  /**
   * Generate cache key with prefix
   */
  private static getKey(key: string): string {
    return `${this.CACHE_PREFIX}${key}`;
  }

  /**
   * Cache user profile data
   */
  static async cacheUserProfile(userId: string, profile: any, ttl = this.DEFAULT_TTL): Promise<void> {
    const key = this.getKey(`user:${userId}`);
    const success = memoryCache.set(key, JSON.stringify(profile), ttl);
    if (!success) {
      logger.warn('Failed to cache user profile', { userId });
    }
  }

  /**
   * Get cached user profile
   */
  static async getCachedUserProfile(userId: string): Promise<any | null> {
    const key = this.getKey(`user:${userId}`);
    const cached = memoryCache.get(key);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (error) {
        logger.error('Failed to parse cached user profile', { userId, error });
        memoryCache.del(key); // Remove corrupted cache
      }
    }
    return null;
  }

  /**
   * Cache company data
   */
  static async cacheCompanyData(companyId: string, data: any, ttl = this.DEFAULT_TTL): Promise<void> {
    const key = this.getKey(`company:${companyId}`);
    const success = memoryCache.set(key, JSON.stringify(data), ttl);
    if (!success) {
      logger.warn('Failed to cache company data', { companyId });
    }
  }

  /**
   * Get cached company data
   */
  static async getCachedCompanyData(companyId: string): Promise<any | null> {
    const key = this.getKey(`company:${companyId}`);
    const cached = memoryCache.get(key);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (error) {
        logger.error('Failed to parse cached company data', { companyId, error });
        memoryCache.del(key);
      }
    }
    return null;
  }

  /**
   * Cache sensor readings for quick access
   */
  static async cacheSensorReadings(sensorId: string, readings: any[], ttl = 1800): Promise<void> { // 30 minutes
    const key = this.getKey(`sensor:readings:${sensorId}`);
    const success = memoryCache.set(key, JSON.stringify(readings), ttl);
    if (!success) {
      logger.warn('Failed to cache sensor readings', { sensorId });
    }
  }

  /**
   * Get cached sensor readings
   */
  static async getCachedSensorReadings(sensorId: string): Promise<any[] | null> {
    const key = this.getKey(`sensor:readings:${sensorId}`);
    const cached = memoryCache.get(key);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (error) {
        logger.error('Failed to parse cached sensor readings', { sensorId, error });
        memoryCache.del(key);
      }
    }
    return null;
  }

  /**
   * Cache analytics data
   */
  static async cacheAnalytics(companyId: string, type: string, data: any, ttl = 900): Promise<void> { // 15 minutes
    const key = this.getKey(`analytics:${companyId}:${type}`);
    const success = memoryCache.set(key, JSON.stringify(data), ttl);
    if (!success) {
      logger.warn('Failed to cache analytics data', { companyId, type });
    }
  }

  /**
   * Get cached analytics data
   */
  static async getCachedAnalytics(companyId: string, type: string): Promise<any | null> {
    const key = this.getKey(`analytics:${companyId}:${type}`);
    const cached = memoryCache.get(key);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (error) {
        logger.error('Failed to parse cached analytics data', { companyId, type, error });
        memoryCache.del(key);
      }
    }
    return null;
  }

  /**
   * Invalidate user cache
   */
  static async invalidateUserCache(userId: string): Promise<void> {
    const key = this.getKey(`user:${userId}`);
    memoryCache.del(key);
  }

  /**
   * Invalidate company cache
   */
  static async invalidateCompanyCache(companyId: string): Promise<void> {
    const key = this.getKey(`company:${companyId}`);
    memoryCache.del(key);
  }

  /**
   * Invalidate sensor cache
   */
  static async invalidateSensorCache(sensorId: string): Promise<void> {
    const key = this.getKey(`sensor:readings:${sensorId}`);
    memoryCache.del(key);
  }

  /**
   * Set rate limiting data
   */
  static async setRateLimit(identifier: string, count: number, windowSeconds: number): Promise<void> {
    const key = this.getKey(`ratelimit:${identifier}`);
    memoryCache.set(key, count.toString(), windowSeconds);
  }

  /**
   * Get rate limiting data
   */
  static async getRateLimit(identifier: string): Promise<number> {
    const key = this.getKey(`ratelimit:${identifier}`);
    const cached = memoryCache.get(key);
    return cached ? parseInt(cached, 10) : 0;
  }

  /**
   * Store temporary data (like password reset tokens)
   */
  static async setTemporary(key: string, data: any, ttlSeconds: number): Promise<void> {
    const cacheKey = this.getKey(`temp:${key}`);
    memoryCache.set(cacheKey, JSON.stringify(data), ttlSeconds);
  }

  /**
   * Get temporary data
   */
  static async getTemporary(key: string): Promise<any | null> {
    const cacheKey = this.getKey(`temp:${key}`);
    const cached = memoryCache.get(key);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (error) {
        logger.error('Failed to parse temporary data', { key, error });
        memoryCache.del(cacheKey);
      }
    }
    return null;
  }

  /**
   * Remove temporary data
   */
  static async removeTemporary(key: string): Promise<void> {
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

// Graceful shutdown
process.on('SIGTERM', () => {
  memoryCache.destroy();
});

process.on('SIGINT', () => {
  memoryCache.destroy();
});