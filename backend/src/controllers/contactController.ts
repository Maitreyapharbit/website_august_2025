import { Request, Response, NextFunction } from 'express';
import { ContactService } from '../services/contactService';
import { ApiResponse } from '../types';

export class ContactController {
  static async submitContact(req: Request, res: Response, next: NextFunction) {
    try {
      const contactData = req.body;
      const contact = await ContactService.createContact(contactData);
      
      const response: ApiResponse = {
        success: true,
        message: 'Contact form submitted successfully. We will get back to you within 24 hours.',
        data: contact
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getAllContacts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await ContactService.getAllContacts(page, limit);
      
      const response: ApiResponse = {
        success: true,
        message: 'Contacts retrieved successfully',
        data: result
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await ContactService.deleteContact(id);
      
      const response: ApiResponse = {
        success: true,
        message: 'Contact deleted successfully'
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}