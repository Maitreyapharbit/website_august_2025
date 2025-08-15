import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, JwtPayload } from '../utils/jwt';
import { ApiError } from './error';
import { StatusCodes } from 'http-status-codes';

export function authenticate(req: Request, _res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
	if (!token) return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Authorization required'));
	try {
		const payload = verifyAccessToken(token);
		req.user = payload;
		return next();
	} catch {
		return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid token'));
	}
}

export function authorize(...roles: string[]) {
	return (req: Request, _res: Response, next: NextFunction) => {
		if (!req.user) return next(new ApiError(StatusCodes.UNAUTHORIZED, 'Authorization required'));
		if (roles.length && !roles.includes(req.user.role)) {
			return next(new ApiError(StatusCodes.FORBIDDEN, 'Forbidden'));
		}
		next();
	};
}