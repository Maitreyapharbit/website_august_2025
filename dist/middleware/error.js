"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
exports.notFoundHandler = notFoundHandler;
exports.errorConverter = errorConverter;
exports.globalErrorHandler = globalErrorHandler;
const celebrate_1 = require("celebrate");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("../config/logger");
class ApiError extends Error {
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApiError = ApiError;
function notFoundHandler(req, res, next) {
    next(new ApiError(http_status_codes_1.StatusCodes.NOT_FOUND, 'Not found'));
}
function errorConverter(err, req, res, next) {
    if ((0, celebrate_1.isCelebrateError)(err)) {
        const details = {};
        err.details.forEach((detail, key) => {
            details[key] = detail.details.map((d) => d.message);
        });
        return next(new ApiError(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Validation error'));
    }
    if (!(err instanceof ApiError)) {
        const statusCode = err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        const message = err.message || (0, http_status_codes_1.getReasonPhrase)(statusCode);
        return next(new ApiError(statusCode, message, false));
    }
    next(err);
}
function globalErrorHandler(err, req, res, next) {
    const statusCode = err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    const response = {
        success: false,
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    };
    if (statusCode >= 500) {
        logger_1.logger.error('Internal error', { err, path: req.path, method: req.method });
    }
    res.status(statusCode).json(response);
}
