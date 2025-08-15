import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/database';
import { ok } from '../utils/response';
import dayjs from 'dayjs';
import { ApiError } from '../middleware/error';
import { StatusCodes } from 'http-status-codes';

export class AnalyticsController {
	static async dashboardStats(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			
			const [productsResult, shipmentsResult, alertsResult] = await Promise.all([
				supabase.from('products').select('id', { count: 'exact' }).eq('manufacturer_id', companyId),
				supabase.from('shipments').select('id', { count: 'exact' }).eq('company_id', companyId),
				supabase.from('alerts').select('id', { count: 'exact' }).eq('company_id', companyId).eq('resolved', false),
			]);
			
			const products = productsResult.count || 0;
			const shipments = shipmentsResult.count || 0;
			const openAlerts = alertsResult.count || 0;
			
			return ok(res, { products, shipments, openAlerts });
		} catch (err) { next(err); }
	}
	
	static async shipmentAnalytics(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			
			const { data: shipments, error } = await supabase
				.from('shipments')
				.select('status')
				.eq('company_id', companyId);
			
			if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch shipment analytics');
			
			// Group by status manually
			const byStatus = shipments.reduce((acc: any[], shipment) => {
				const existing = acc.find(item => item.status === shipment.status);
				if (existing) {
					existing._count._all++;
				} else {
					acc.push({ status: shipment.status, _count: { _all: 1 } });
				}
				return acc;
			}, []);
			
			return ok(res, { byStatus });
		} catch (err) { next(err); }
	}
	
	static async temperatureTrends(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			const from = dayjs().subtract(30, 'day').toDate();
			
			const { data: sensors, error: sensorsError } = await supabase
				.from('sensors')
				.select('id')
				.eq('company_id', companyId);
			
			if (sensorsError) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensors');
			
			const sensorIds = sensors.map((s) => s.id);
			
			const { data: readings, error: readingsError } = await supabase
				.from('sensor_readings')
				.select('temperature')
				.in('sensor_id', sensorIds)
				.gte('created_at', from.toISOString());
			
			if (readingsError) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensor readings');
			
			// Simple aggregation
			const avg = readings.reduce((acc, r) => acc + r.temperature, 0) / Math.max(1, readings.length);
			return ok(res, { averageTemperature: avg, samples: readings.length });
		} catch (err) { next(err); }
	}
	
	static async alertsSummary(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			
			const { data: alerts, error } = await supabase
				.from('alerts')
				.select('type')
				.eq('company_id', companyId);
			
			if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch alerts');
			
			// Group by type manually
			const byType = alerts.reduce((acc: any[], alert) => {
				const existing = acc.find(item => item.type === alert.type);
				if (existing) {
					existing._count._all++;
				} else {
					acc.push({ type: alert.type, _count: { _all: 1 } });
				}
				return acc;
			}, []);
			
			return ok(res, { byType });
		} catch (err) { next(err); }
	}
}