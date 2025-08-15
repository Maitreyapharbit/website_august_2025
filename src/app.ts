import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { errors as celebrateErrors } from 'celebrate';
import swaggerUi from 'swagger-ui-express';
import { createClient } from 'redis';
import { env } from './config/env';
import { logger, stream as morganStream } from './config/logger';
import { limiter } from './config/rateLimiter';
import { swaggerSpec } from './config/swagger';
import routesV1 from './routes/v1';
import healthRouter from './routes/health.routes';
import { notFoundHandler, errorConverter, globalErrorHandler } from './middleware/error';
import { sanitizeRequest } from './middleware/security';

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGINS, credentials: true }));
app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev', { stream: morganStream }));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeRequest);
app.use(limiter);

// Sessions via Redis (node-redis)
const redisClient = createClient({ url: env.REDIS_URL });
redisClient.connect().catch((err) => logger.error('Redis connect error', { err }));
const store = new RedisStore({ client: redisClient as any });
app.use(session({
	store,
	secret: env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: { secure: false, httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 24 },
}));

// Static for uploads
app.use('/uploads', express.static(env.UPLOAD_DIR));

// Health
app.use('/health', healthRouter);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API v1
app.use('/api/v1', routesV1);

// Errors
app.use(notFoundHandler);
app.use(errorConverter);
app.use(celebrateErrors());
app.use(globalErrorHandler);

export default app;