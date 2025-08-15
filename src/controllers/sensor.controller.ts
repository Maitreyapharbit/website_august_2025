import { Request, Response, NextFunction } from 'express';
import { SensorService } from '../services/sensor.service';
import { ok, created } from '../utils/response';

export class SensorController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const { serial, productId } = req.body;
			const sensor = await SensorService.register(req.user!.companyId!, serial, productId);
			return created(res, sensor);
		} catch (err) { next(err); }
	}
	static async pushData(req: Request, res: Response, next: NextFunction) {
		try {
			const reading = await SensorService.addReading(req.params.sensorId, req.body);
			return created(res, reading);
		} catch (err) { next(err); }
	}
	static async history(req: Request, res: Response, next: NextFunction) {
		try {
			const data = await SensorService.listReadings(req.params.sensorId, Number(req.query.take) || 100);
			return ok(res, data);
		} catch (err) { next(err); }
	}
	static async createAlert(req: Request, res: Response, next: NextFunction) {
		try {
			const alert = await SensorService.addAlert(req.user!.companyId!, { ...req.body, sensorId: req.params.sensorId });
			return created(res, alert);
		} catch (err) { next(err); }
	}
	static async listAlerts(req: Request, res: Response, next: NextFunction) {
		try {
			const alerts = await SensorService.listAlerts(req.user!.companyId!);
			return ok(res, alerts);
		} catch (err) { next(err); }
	}
}