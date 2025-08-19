"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
exports.authorize = authorize;
const jwt_1 = require("../utils/jwt");
const error_1 = require("./error");
const http_status_codes_1 = require("http-status-codes");
function authenticate(req, _res, next) {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token)
        return next(new error_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Authorization required'));
    try {
        const payload = (0, jwt_1.verifyAccessToken)(token);
        req.user = payload;
        return next();
    }
    catch {
        return next(new error_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Invalid token'));
    }
}
function authorize(...roles) {
    return (req, _res, next) => {
        if (!req.user)
            return next(new error_1.ApiError(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Authorization required'));
        if (roles.length && !roles.includes(req.user.role)) {
            return next(new error_1.ApiError(http_status_codes_1.StatusCodes.FORBIDDEN, 'Forbidden'));
        }
        next();
    };
}
