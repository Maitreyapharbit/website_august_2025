import rateLimit from 'express-rate-limit';
import { env } from './env';

export const limiter = rateLimit({
	windowMs: env.RATE_LIMIT_WINDOW_MINUTES * 60 * 1000,
	max: env.RATE_LIMIT_MAX,
	standardHeaders: true,
	legacyHeaders: false,
});