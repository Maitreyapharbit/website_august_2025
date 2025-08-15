import { Router } from 'express';
import { testDatabaseConnection } from '../config/database';
import { CacheService } from '../services/cache.service';

const router = Router();

router.get('/', async (_req, res) => {
	try {
		// Check cache health
		const cacheStats = CacheService.getStats();
		const cacheHealthy = true; // In-memory cache is always healthy if the process is running
		
		// Check database health
		const dbHealthy = await testDatabaseConnection();
		
		const overallStatus = cacheHealthy && dbHealthy ? 'healthy' : 'unhealthy';
		const statusCode = overallStatus === 'healthy' ? 200 : 503;
		
		res.status(statusCode).json({
			status: overallStatus,
			uptime: process.uptime(),
			timestamp: new Date().toISOString(),
			services: {
				cache: cacheHealthy ? 'healthy' : 'unhealthy',
				database: dbHealthy ? 'healthy' : 'unhealthy'
			},
			cache: cacheStats
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