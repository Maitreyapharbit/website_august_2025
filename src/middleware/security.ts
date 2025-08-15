import xss from 'xss';
import { Request, Response, NextFunction } from 'express';

function sanitizeInPlace(value: any): void {
	if (typeof value === 'string') {
		return;
	}
	if (Array.isArray(value)) {
		for (let i = 0; i < value.length; i++) {
			if (typeof value[i] === 'string') value[i] = xss(value[i]);
			else if (value[i] && typeof value[i] === 'object') sanitizeInPlace(value[i]);
		}
		return;
	}
	if (value && typeof value === 'object') {
		for (const key of Object.keys(value)) {
			const v = (value as any)[key];
			if (typeof v === 'string') (value as any)[key] = xss(v);
			else if (v && typeof v === 'object') sanitizeInPlace(v);
		}
	}
}

export function sanitizeRequest(req: Request, res: Response, next: NextFunction) {
	if (req.body && typeof req.body === 'object') sanitizeInPlace(req.body);
	// Skip req.query due to Express 5 immutability of the getter
	if (req.params && typeof req.params === 'object') sanitizeInPlace(req.params as any);
	next();
}