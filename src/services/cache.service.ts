import { RedisCache } from '../config/redis';
import { logger } from '../config/logger';

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
		const success = await RedisCache.set(key, JSON.stringify(profile), ttl);
		if (!success) {
			logger.warn('Failed to cache user profile', { userId });
		}
	}

	/**
	 * Get cached user profile
	 */
	static async getCachedUserProfile(userId: string): Promise<any | null> {
		const key = this.getKey(`user:${userId}`);
		const cached = await RedisCache.get(key);
		if (cached) {
			try {
				return JSON.parse(cached);
			} catch (error) {
				logger.error('Failed to parse cached user profile', { userId, error });
				await RedisCache.del(key); // Remove corrupted cache
			}
		}
		return null;
	}

	/**
	 * Cache company data
	 */
	static async cacheCompanyData(companyId: string, data: any, ttl = this.DEFAULT_TTL): Promise<void> {
		const key = this.getKey(`company:${companyId}`);
		const success = await RedisCache.set(key, JSON.stringify(data), ttl);
		if (!success) {
			logger.warn('Failed to cache company data', { companyId });
		}
	}

	/**
	 * Get cached company data
	 */
	static async getCachedCompanyData(companyId: string): Promise<any | null> {
		const key = this.getKey(`company:${companyId}`);
		const cached = await RedisCache.get(key);
		if (cached) {
			try {
				return JSON.parse(cached);
			} catch (error) {
				logger.error('Failed to parse cached company data', { companyId, error });
				await RedisCache.del(key);
			}
		}
		return null;
	}

	/**
	 * Cache sensor readings for quick access
	 */
	static async cacheSensorReadings(sensorId: string, readings: any[], ttl = 1800): Promise<void> { // 30 minutes
		const key = this.getKey(`sensor:readings:${sensorId}`);
		const success = await RedisCache.set(key, JSON.stringify(readings), ttl);
		if (!success) {
			logger.warn('Failed to cache sensor readings', { sensorId });
		}
	}

	/**
	 * Get cached sensor readings
	 */
	static async getCachedSensorReadings(sensorId: string): Promise<any[] | null> {
		const key = this.getKey(`sensor:readings:${sensorId}`);
		const cached = await RedisCache.get(key);
		if (cached) {
			try {
				return JSON.parse(cached);
			} catch (error) {
				logger.error('Failed to parse cached sensor readings', { sensorId, error });
				await RedisCache.del(key);
			}
		}
		return null;
	}

	/**
	 * Cache analytics data
	 */
	static async cacheAnalytics(companyId: string, type: string, data: any, ttl = 900): Promise<void> { // 15 minutes
		const key = this.getKey(`analytics:${companyId}:${type}`);
		const success = await RedisCache.set(key, JSON.stringify(data), ttl);
		if (!success) {
			logger.warn('Failed to cache analytics data', { companyId, type });
		}
	}

	/**
	 * Get cached analytics data
	 */
	static async getCachedAnalytics(companyId: string, type: string): Promise<any | null> {
		const key = this.getKey(`analytics:${companyId}:${type}`);
		const cached = await RedisCache.get(key);
		if (cached) {
			try {
				return JSON.parse(cached);
			} catch (error) {
				logger.error('Failed to parse cached analytics data', { companyId, type, error });
				await RedisCache.del(key);
			}
		}
		return null;
	}

	/**
	 * Invalidate user cache
	 */
	static async invalidateUserCache(userId: string): Promise<void> {
		const key = this.getKey(`user:${userId}`);
		await RedisCache.del(key);
	}

	/**
	 * Invalidate company cache
	 */
	static async invalidateCompanyCache(companyId: string): Promise<void> {
		const key = this.getKey(`company:${companyId}`);
		await RedisCache.del(key);
	}

	/**
	 * Invalidate sensor cache
	 */
	static async invalidateSensorCache(sensorId: string): Promise<void> {
		const key = this.getKey(`sensor:readings:${sensorId}`);
		await RedisCache.del(key);
	}

	/**
	 * Set rate limiting data
	 */
	static async setRateLimit(identifier: string, count: number, windowSeconds: number): Promise<void> {
		const key = this.getKey(`ratelimit:${identifier}`);
		await RedisCache.set(key, count.toString(), windowSeconds);
	}

	/**
	 * Get rate limiting data
	 */
	static async getRateLimit(identifier: string): Promise<number> {
		const key = this.getKey(`ratelimit:${identifier}`);
		const cached = await RedisCache.get(key);
		return cached ? parseInt(cached, 10) : 0;
	}

	/**
	 * Store temporary data (like password reset tokens)
	 */
	static async setTemporary(key: string, data: any, ttlSeconds: number): Promise<void> {
		const cacheKey = this.getKey(`temp:${key}`);
		await RedisCache.set(cacheKey, JSON.stringify(data), ttlSeconds);
	}

	/**
	 * Get temporary data
	 */
	static async getTemporary(key: string): Promise<any | null> {
		const cacheKey = this.getKey(`temp:${key}`);
		const cached = await RedisCache.get(cacheKey);
		if (cached) {
			try {
				return JSON.parse(cached);
			} catch (error) {
				logger.error('Failed to parse temporary data', { key, error });
				await RedisCache.del(cacheKey);
			}
		}
		return null;
	}

	/**
	 * Remove temporary data
	 */
	static async removeTemporary(key: string): Promise<void> {
		const cacheKey = this.getKey(`temp:${key}`);
		await RedisCache.del(cacheKey);
	}
}