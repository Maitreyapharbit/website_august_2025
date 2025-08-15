import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { logger } from '../config/logger';

export class ApiError extends Error {
	statusCode: number;
	isOperational: boolean;
	constructor(statusCode: number, message: string, isOperational = true) {
		super(message);
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		Error.captureStackTrace(this, this.constructor);
	}
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
	next(new ApiError(StatusCodes.NOT_FOUND, 'Not found'));
}

export function errorConverter(err: any, req: Request, res: Response, next: NextFunction) {
	if (isCelebrateError(err)) {
		const details: Record<string, any> = {};
		err.details.forEach((detail, key) => {
			details[key as string] = detail.details.map((d) => d.message);
		});
		return next(new ApiError(StatusCodes.BAD_REQUEST, 'Validation error'));
	}
	if (!(err instanceof ApiError)) {
		const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
		const message = err.message || getReasonPhrase(statusCode);
		return next(new ApiError(statusCode, message, false));
	}
	next(err);
}

export function globalErrorHandler(err: ApiError, req: Request, res: Response, next: NextFunction) {
	const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
	const response: any = {
		success: false,
		message: err.message,
		...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
	};
	if (statusCode >= 500) {
		logger.error('Internal error', { err, path: req.path, method: req.method });
	}
	res.status(statusCode).json(response);
}