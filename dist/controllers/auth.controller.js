"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
const jwt_1 = require("../utils/jwt");
class AuthController {
    static async register(req, res, next) {
        try {
            const { email, password, companyName, firstName, lastName } = req.body;
            const result = await auth_service_1.AuthService.register({ email, password, companyName, firstName, lastName });
            return (0, response_1.created)(res, result, 'Registered');
        }
        catch (err) {
            next(err);
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.AuthService.login(email, password);
            return (0, response_1.ok)(res, result, 'Logged in');
        }
        catch (err) {
            next(err);
        }
    }
    static async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const payload = (0, jwt_1.verifyRefreshToken)(refreshToken);
            const tokens = await auth_service_1.AuthService.refresh(payload.userId, payload.role, payload.companyId);
            return (0, response_1.ok)(res, { tokens }, 'Refreshed');
        }
        catch (err) {
            next(err);
        }
    }
    static async profile(req, res, next) {
        try {
            const user = await auth_service_1.AuthService.getProfile(req.user.userId);
            return (0, response_1.ok)(res, user);
        }
        catch (err) {
            next(err);
        }
    }
    static async updateProfile(req, res, next) {
        try {
            const updated = await auth_service_1.AuthService.updateProfile(req.user.userId, req.body);
            return (0, response_1.ok)(res, updated, 'Profile updated');
        }
        catch (err) {
            next(err);
        }
    }
    static async forgotPassword(req, res, next) {
        try {
            await auth_service_1.AuthService.forgotPassword(req.body.email);
            return (0, response_1.ok)(res, {}, 'If account exists, email sent');
        }
        catch (err) {
            next(err);
        }
    }
    static async resetPassword(req, res, next) {
        try {
            const { email, token, newPassword } = req.body;
            await auth_service_1.AuthService.resetPassword(email, token, newPassword);
            return (0, response_1.ok)(res, {}, 'Password updated');
        }
        catch (err) {
            next(err);
        }
    }
}
exports.AuthController = AuthController;
