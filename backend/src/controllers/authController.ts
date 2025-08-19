import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';
import { ApiResponse } from '../types';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      
      const result = await AuthService.login(email, password);
      
      const response: ApiResponse = {
        success: true,
        message: 'Login successful',
        data: result
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // In a stateless JWT system, logout is handled client-side
      // You could implement token blacklisting here if needed
      
      const response: ApiResponse = {
        success: true,
        message: 'Logout successful'
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async verify(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          error: 'No token provided'
        });
      }

      const decoded = await AuthService.verifyToken(token);
      
      const response: ApiResponse = {
        success: true,
        message: 'Token is valid',
        data: { user: decoded }
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}