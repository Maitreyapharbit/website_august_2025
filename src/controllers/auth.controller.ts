import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { ok, created } from '../utils/response';
import { verifyRefreshToken } from '../utils/jwt';

export class AuthController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password, companyName, firstName, lastName } = req.body;
			const result = await AuthService.register({ email, password, companyName, firstName, lastName });
			return created(res, result, 'Registered');
		} catch (err) { next(err); }
	}
	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body;
			const result = await AuthService.login(email, password);
			return ok(res, result, 'Logged in');
		} catch (err) { next(err); }
	}
	static async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.body as { refreshToken: string };
			const payload = verifyRefreshToken(refreshToken);
			const tokens = await AuthService.refresh(payload.userId, payload.role, payload.companyId);
			return ok(res, { tokens }, 'Refreshed');
		} catch (err) { next(err); }
	}
	static async profile(req: Request, res: Response, next: NextFunction) {
		try {
			const user = await AuthService.getProfile(req.user!.userId);
			return ok(res, user);
		} catch (err) { next(err); }
	}
	static async updateProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const updated = await AuthService.updateProfile(req.user!.userId, req.body);
			return ok(res, updated, 'Profile updated');
		} catch (err) { next(err); }
	}
	static async forgotPassword(req: Request, res: Response, next: NextFunction) {
		try {
			await AuthService.forgotPassword(req.body.email);
			return ok(res, { }, 'If account exists, email sent');
		} catch (err) { next(err); }
	}
	static async resetPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, token, newPassword } = req.body;
			await AuthService.resetPassword(email, token, newPassword);
			return ok(res, {}, 'Password updated');
		} catch (err) { next(err); }
	}
}