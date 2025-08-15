import { Request, Response, NextFunction } from 'express';
import { CompanyService } from '../services/company.service';
import { ok, created, noContent } from '../utils/response';

export class CompanyController {
	/**
	 * @openapi
	 * /companies:
	 *   get:
	 *     summary: List verified pharma companies
	 *     tags: [Companies]
	 *     responses:
	 *       200:
	 *         description: OK
	 */
	static async list(_req: Request, res: Response, next: NextFunction) {
		try { return ok(res, await CompanyService.list()); } catch (err) { next(err); }
	}
	static async create(req: Request, res: Response, next: NextFunction) {
		try { return created(res, await CompanyService.create(req.body)); } catch (err) { next(err); }
	}
	static async get(req: Request, res: Response, next: NextFunction) {
		try { return ok(res, await CompanyService.get(req.params.id)); } catch (err) { next(err); }
	}
	static async update(req: Request, res: Response, next: NextFunction) {
		try { return ok(res, await CompanyService.update(req.params.id, req.body)); } catch (err) { next(err); }
	}
	static async remove(req: Request, res: Response, next: NextFunction) {
		try { await CompanyService.remove(req.params.id); return noContent(res); } catch (err) { next(err); }
	}
}