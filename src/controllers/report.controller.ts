import { Request, Response, NextFunction } from 'express';
import { ok, created } from '../utils/response';
import { supabase } from '../config/database';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';
import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';
import { ApiError } from '../middleware/error';
import { StatusCodes } from 'http-status-codes';

export class ReportController {
	static async compliance(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			
			const { data: reports, error } = await supabase
				.from('compliance_reports')
				.select('*')
				.eq('company_id', companyId);
			
			if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch compliance reports');
			return ok(res, reports);
		} catch (err) { next(err); }
	}
	
	static async temperature(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			const from = req.query.from ? new Date(String(req.query.from)) : dayjs().subtract(7, 'day').toDate();
			const to = req.query.to ? new Date(String(req.query.to)) : new Date();
			
			const { data: sensors, error: sensorsError } = await supabase
				.from('sensors')
				.select('id')
				.eq('company_id', companyId);
			
			if (sensorsError) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensors');
			
			const sensorIds = sensors.map((s) => s.id);
			
			const { data, error } = await supabase
				.from('sensor_readings')
				.select('*')
				.in('sensor_id', sensorIds)
				.gte('created_at', from.toISOString())
				.lte('created_at', to.toISOString())
				.order('created_at', { ascending: true });
			
			if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch temperature data');
			return ok(res, data);
		} catch (err) { next(err); }
	}
	
	static async export(req: Request, res: Response, next: NextFunction) {
		try {
			const { type, format } = req.body as { type: 'shipments' | 'alerts' | 'temperature'; format: 'csv' | 'pdf' };
			const companyId = req.user!.companyId!;
			let rows: any[] = [];
			
			if (type === 'shipments') {
				const { data, error } = await supabase
					.from('shipments')
					.select('*')
					.eq('company_id', companyId);
				if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch shipments');
				rows = data;
			}
			
			if (type === 'alerts') {
				const { data, error } = await supabase
					.from('alerts')
					.select('*')
					.eq('company_id', companyId);
				if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch alerts');
				rows = data;
			}
			
			if (type === 'temperature') {
				const { data: sensors, error: sensorsError } = await supabase
					.from('sensors')
					.select('id')
					.eq('company_id', companyId);
				
				if (sensorsError) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensors');
				
				const sensorIds = sensors.map((s) => s.id);
				
				const { data, error } = await supabase
					.from('sensor_readings')
					.select('*')
					.in('sensor_id', sensorIds)
					.limit(1000);
				
				if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch sensor readings');
				rows = data;
			}
			
			if (format === 'csv') {
				const parser = new Parser();
				const csv = parser.parse(rows);
				res.header('Content-Type', 'text/csv');
				res.attachment(`${type}-${Date.now()}.csv`);
				return res.send(csv);
			}
			
			const doc = new PDFDocument();
			res.setHeader('Content-Type', 'application/pdf');
			doc.pipe(res);
			doc.fontSize(16).text(`Pharbit Export: ${type}`, { underline: true });
			doc.moveDown();
			rows.slice(0, 100).forEach((row) => doc.fontSize(10).text(JSON.stringify(row)));
			doc.end();
		} catch (err) { next(err); }
	}
	
	static async auditTrail(req: Request, res: Response, next: NextFunction) {
		try {
			const productId = req.params.productId;
			
			const { data: logs, error } = await supabase
				.from('audit_logs')
				.select('*')
				.eq('product_id', productId)
				.order('created_at', { ascending: true });
			
			if (error) throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Failed to fetch audit logs');
			return ok(res, logs);
		} catch (err) { next(err); }
	}
}