import { Router } from 'express';
import { AnalyticsController } from '../../controllers/analytics.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.get('/dashboard/stats', authenticate, AnalyticsController.dashboardStats);
router.get('/analytics/shipments', authenticate, AnalyticsController.shipmentAnalytics);
router.get('/analytics/temperature-trends', authenticate, AnalyticsController.temperatureTrends);
router.get('/analytics/alerts-summary', authenticate, AnalyticsController.alertsSummary);

export default router;