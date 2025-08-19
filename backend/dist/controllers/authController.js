"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const authService_1 = require("../services/authService");
class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await authService_1.AuthService.login(email, password);
            const response = {
                success: true,
                message: 'Login successful',
                data: result
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async logout(req, res, next) {
        try {
            const response = {
                success: true,
                message: 'Logout successful'
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async verify(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({
                    success: false,
                    error: 'No token provided'
                });
            }
            const decoded = await authService_1.AuthService.verifyToken(token);
            const response = {
                success: true,
                message: 'Token is valid',
                data: { user: decoded }
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=authController.js.map