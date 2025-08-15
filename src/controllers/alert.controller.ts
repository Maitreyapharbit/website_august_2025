import { Request, Response, NextFunction } from 'express';
import { SensorService } from '../services/sensor.service';
import { ok } from '../utils/response';

export class AlertController {
	static async list(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			const alerts = await SensorService.listAlerts(companyId);
			return ok(res, alerts);
		} catch (err) { next(err); }
	}
}