import { Request, Response, NextFunction } from 'express';
import { ShipmentService } from '../services/shipment.service';
import { ok, created } from '../utils/response';

export class ShipmentController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user!.companyId!;
			return created(res, await ShipmentService.create({ ...req.body, companyId }));
		} catch (err) { next(err); }
	}
	static async list(req: Request, res: Response, next: NextFunction) {
		try {
			const companyId = req.user?.companyId;
			const status = (req.query.status as string) || undefined;
			return ok(res, await ShipmentService.list({ companyId, status }));
		} catch (err) { next(err); }
	}
	static async get(req: Request, res: Response, next: NextFunction) {
		try { return ok(res, await ShipmentService.get(req.params.id)); } catch (err) { next(err); }
	}
	static async addCheckpoint(req: Request, res: Response, next: NextFunction) {
		try { return ok(res, await ShipmentService.addCheckpoint(req.params.id, req.body), 'Checkpoint added'); } catch (err) { next(err); }
	}
	static async history(req: Request, res: Response, next: NextFunction) {
		try { return ok(res, await ShipmentService.history(req.params.id)); } catch (err) { next(err); }
	}
}