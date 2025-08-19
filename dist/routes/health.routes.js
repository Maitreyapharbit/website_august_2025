"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = require("../config/database");
const cache_service_1 = require("../services/cache.service");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        // Check cache health
        const cacheStats = cache_service_1.CacheService.getStats();
        const cacheHealthy = true; // In-memory cache is always healthy if the process is running
        // Check database health
        const dbHealthy = await (0, database_1.testDatabaseConnection)();
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
    }
    catch (error) {
        res.status(503).json({
            status: 'unhealthy',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            error: 'Health check failed'
        });
    }
});
exports.default = router;
