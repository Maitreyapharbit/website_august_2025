import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma';
import { ok } from '../utils/response';
import dayjs from 'dayjs';

export class AnalyticsController {
	static async dashboardStats(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			const [products, shipments, alerts] = await Promise.all([
				prisma.product.count({ where: { manufacturerId: companyId } }),
				prisma.shipment.count({ where: { companyId } }),
				prisma.alert.count({ where: { companyId, resolved: false } }),
			]);
			return ok(res, { products, shipments, openAlerts: alerts });
		} catch (err) { next(err); }
	}
	static async shipmentAnalytics(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			const byStatus = await prisma.shipment.groupBy({ by: ['status'], where: { companyId }, _count: { _all: true } });
			return ok(res, { byStatus });
		} catch (err) { next(err); }
	}
	static async temperatureTrends(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			const from = dayjs().subtract(30, 'day').toDate();
			const sensors = await prisma.sensor.findMany({ where: { companyId }, select: { id: true } });
			const sensorIds = sensors.map((s) => s.id);
			const readings = await prisma.sensorReading.findMany({ where: { sensorId: { in: sensorIds }, createdAt: { gte: from } } });
			// naive aggregation
			const avg = readings.reduce((acc, r) => acc + r.temperature, 0) / Math.max(1, readings.length);
			return ok(res, { averageTemperature: avg, samples: readings.length });
		} catch (err) { next(err); }
	}
	static async alertsSummary(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			const byType = await prisma.alert.groupBy({ by: ['type'], where: { companyId }, _count: { _all: true } });
			return ok(res, { byType });
		} catch (err) { next(err); }
	}
}