import { Request, Response, NextFunction } from 'express';
import { ProductService, BatchService } from '../services/product.service';
import { ok, created } from '../utils/response';

export class ProductController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try { 
			const manufacturerId = req.user?.companyId!;
			return created(res, await ProductService.create({ ...req.body, manufacturerId })); 
		} catch (err) { next(err); }
	}
	static async list(req: Request, res: Response, next: NextFunction) {
		try { return ok(res, await ProductService.list({ manufacturerId: req.user?.companyId })); } catch (err) { next(err); }
	}
	static async get(req: Request, res: Response, next: NextFunction) {
		try { return ok(res, await ProductService.get(req.params.id)); } catch (err) { next(err); }
	}
}

export class BatchController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try { 
			const { id } = req.params; 
			const payload = { ...req.body, expiryDate: new Date(req.body.expiryDate) };
			return created(res, await BatchService.create(id, payload));
		} catch (err) { next(err); }
	}
	static async get(req: Request, res: Response, next: NextFunction) {
		try { return ok(res, await BatchService.get(req.params.batchId)); } catch (err) { next(err); }
	}
	static async updateLocation(req: Request, res: Response, next: NextFunction) {
		try { return ok(res, await BatchService.updateLocation(req.params.batchId, req.body.location), 'Location updated'); } catch (err) { next(err); }
	}
	static async updateStatus(req: Request, res: Response, next: NextFunction) {
		try { return ok(res, await BatchService.updateStatus(req.params.batchId, req.body.status), 'Status updated'); } catch (err) { next(err); }
	}
}