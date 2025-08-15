import { createClient } from 'redis';
import { env } from './env';
import { logger } from './logger';

// Create Redis client with enhanced configuration
export const redisClient = createClient({
	url: env.REDIS_URL,
	socket: {
		reconnectStrategy: (retries) => {
			// Exponential backoff with max delay of 3 seconds
			const delay = Math.min(retries * 50, 3000);
			logger.info(`Redis reconnect attempt ${retries}, delay: ${delay}ms`);
			return delay;
		},
		connectTimeout: 10000, // 10 seconds
		lazyConnect: true
	},
	// Enable command timeout
	commandsQueueMaxLength: 1000,
	// Disable offline queue to prevent memory issues
	enableOfflineQueue: false
});

// Enhanced Redis event handlers
redisClient.on('error', (err) => {
	logger.error('Redis client error', { 
		error: err.message, 
		code: err.code,
		stack: err.stack 
	});
});

redisClient.on('connect', () => {
	logger.info('Redis client connected successfully');
});

redisClient.on('reconnecting', () => {
	logger.warn('Redis client reconnecting...');
});

redisClient.on('ready', () => {
	logger.info('Redis client ready for commands');
});

redisClient.on('end', () => {
	logger.warn('Redis client connection ended');
});

// Initialize Redis connection
export async function initializeRedis() {
	try {
		await redisClient.connect();
		logger.info('Redis initialized successfully');
		
		// Test the connection
		await redisClient.ping();
		logger.info('Redis ping successful');
		
		return redisClient;
	} catch (error) {
		logger.error('Failed to initialize Redis', { error });
		throw error;
	}
}

// Graceful shutdown
export async function closeRedis() {
	try {
		await redisClient.quit();
		logger.info('Redis connection closed gracefully');
	} catch (error) {
		logger.error('Error closing Redis connection', { error });
		// Force close if graceful close fails
		await redisClient.disconnect();
	}
}

// Health check function
export async function checkRedisHealth() {
	try {
		const result = await redisClient.ping();
		return result === 'PONG';
	} catch (error) {
		logger.error('Redis health check failed', { error });
		return false;
	}
}

// Cache utility functions with error handling
export class RedisCache {
	static async get(key: string): Promise<string | null> {
		try {
			return await redisClient.get(key);
		} catch (error) {
			logger.error('Redis GET error', { key, error });
			return null;
		}
	}

	static async set(key: string, value: string, ttlSeconds?: number): Promise<boolean> {
		try {
			if (ttlSeconds) {
				await redisClient.setEx(key, ttlSeconds, value);
			} else {
				await redisClient.set(key, value);
			}
			return true;
		} catch (error) {
			logger.error('Redis SET error', { key, error });
			return false;
		}
	}

	static async del(key: string): Promise<boolean> {
		try {
			const result = await redisClient.del(key);
			return result > 0;
		} catch (error) {
			logger.error('Redis DEL error', { key, error });
			return false;
		}
	}

	static async exists(key: string): Promise<boolean> {
		try {
			const result = await redisClient.exists(key);
			return result === 1;
		} catch (error) {
			logger.error('Redis EXISTS error', { key, error });
			return false;
		}
	}

	static async expire(key: string, ttlSeconds: number): Promise<boolean> {
		try {
			const result = await redisClient.expire(key, ttlSeconds);
			return result === 1;
		} catch (error) {
			logger.error('Redis EXPIRE error', { key, error });
			return false;
		}
	}
}