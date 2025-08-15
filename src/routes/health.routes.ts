import { Router } from 'express';
import { checkRedisHealth } from '../config/redis';
import { testDatabaseConnection } from '../config/database';

const router = Router();

router.get('/', async (_req, res) => {
	try {
		// Check Redis health
		const redisHealthy = await checkRedisHealth();
		
		// Check database health
		const dbHealthy = await testDatabaseConnection();
		
		const overallStatus = redisHealthy && dbHealthy ? 'healthy' : 'unhealthy';
		const statusCode = overallStatus === 'healthy' ? 200 : 503;
		
		res.status(statusCode).json({
			status: overallStatus,
			uptime: process.uptime(),
			timestamp: new Date().toISOString(),
			services: {
				redis: redisHealthy ? 'healthy' : 'unhealthy',
				database: dbHealthy ? 'healthy' : 'unhealthy'
			}
		});
	} catch (error) {
		res.status(503).json({
			status: 'unhealthy',
			uptime: process.uptime(),
			timestamp: new Date().toISOString(),
			error: 'Health check failed'
		});
	}
});

export default router;