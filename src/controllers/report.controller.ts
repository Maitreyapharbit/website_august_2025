import { Request, Response, NextFunction } from 'express';
import { ok, created } from '../utils/response';
import { prisma } from '../config/prisma';
import { Parser } from 'json2csv';
import PDFDocument from 'pdfkit';
import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path';

export class ReportController {
	static async compliance(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			const reports = await prisma.complianceReport.findMany({ where: { companyId } });
			return ok(res, reports);
		} catch (err) { next(err); }
	}
	static async temperature(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			const from = req.query.from ? new Date(String(req.query.from)) : dayjs().subtract(7, 'day').toDate();
			const to = req.query.to ? new Date(String(req.query.to)) : new Date();
			const sensors = await prisma.sensor.findMany({ where: { companyId }, select: { id: true } });
			const sensorIds = sensors.map((s) => s.id);
			const data = await prisma.sensorReading.findMany({ where: { sensorId: { in: sensorIds }, createdAt: { gte: from, lte: to } }, orderBy: { createdAt: 'asc' } });
			return ok(res, data);
		} catch (err) { next(err); }
	}
	static async export(req: Request, res: Response, next: NextFunction) {
		try {
			const { type, format } = req.body as { type: 'shipments' | 'alerts' | 'temperature'; format: 'csv' | 'pdf' };
			const companyId = req.user!.companyId!;
			let rows: any[] = [];
			if (type === 'shipments') rows = await prisma.shipment.findMany({ where: { companyId } });
			if (type === 'alerts') rows = await prisma.alert.findMany({ where: { companyId } });
			if (type === 'temperature') {
				const sensors = await prisma.sensor.findMany({ where: { companyId }, select: { id: true } });
				const sensorIds = sensors.map((s) => s.id);
				rows = await prisma.sensorReading.findMany({ where: { sensorId: { in: sensorIds } }, take: 1000 });
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
			const logs = await prisma.auditLog.findMany({ where: { productId }, orderBy: { createdAt: 'asc' } });
			return ok(res, logs);
		} catch (err) { next(err); }
	}
}