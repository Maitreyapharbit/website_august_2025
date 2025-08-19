import express from 'express';
import path from 'path';
import { limiter } from './config/rateLimiter';
import { sanitizeRequest } from './middleware/security';
import healthRouter from './routes/health.routes';
import v1Router from './routes/v1/index';
import { errorConverter, globalErrorHandler, notFoundHandler } from './middleware/error';

const app = express();

// Core middleware
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Security and rate limiting
app.use(limiter);
app.use(sanitizeRequest);

// Static files for downloads/reports if any
app.use('/static', express.static(path.join(process.cwd(), 'public')));

// Health check
app.use('/health', healthRouter);

// API v1
app.use('/api/v1', v1Router);

// 404 and error handling
app.use(notFoundHandler);
app.use(errorConverter);
app.use(globalErrorHandler);

export default app;

