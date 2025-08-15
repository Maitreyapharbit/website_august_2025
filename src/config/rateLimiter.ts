import rateLimit from 'express-rate-limit';
import { CacheService } from '../services/cache.service';
import { env } from './env';

// Custom store using our in-memory cache
const store = {
  incr: async (key: string) => {
    const current = await CacheService.getRateLimit(key);
    const newCount = current + 1;
    await CacheService.setRateLimit(key, newCount, env.RATE_LIMIT_WINDOW_MINUTES * 60);
    return { totalHits: newCount, resetTime: new Date(Date.now() + env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000) };
  },
  decrement: async (key: string) => {
    const current = await CacheService.getRateLimit(key);
    const newCount = Math.max(0, current - 1);
    await CacheService.setRateLimit(key, newCount, env.RATE_LIMIT_WINDOW_MINUTES * 60);
  },
  resetKey: async (key: string) => {
    await CacheService.setRateLimit(key, 0, env.RATE_LIMIT_WINDOW_MINUTES * 60);
  }
};

export const limiter = rateLimit({
	windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
	max: env.RATE_LIMIT_MAX,
	standardHeaders: true,
	legacyHeaders: false,
	store: store as any,
});