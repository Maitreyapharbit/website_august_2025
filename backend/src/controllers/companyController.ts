import { Request, Response, NextFunction } from 'express';
import { CompanyService } from '../services/companyService';
import { ApiResponse } from '../types';

export class CompanyController {
  static async getCompanyInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const company = await CompanyService.getCompanyInfo();
      
      const response: ApiResponse = {
        success: true,
        message: 'Company information retrieved successfully',
        data: company
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateCompanyInfo(req: Request, res: Response, next: NextFunction) {
    try {
      const updates = req.body;
      const company = await CompanyService.updateCompanyInfo(updates);
      
      const response: ApiResponse = {
        success: true,
        message: 'Company information updated successfully',
        data: company
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}