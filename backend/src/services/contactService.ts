import { supabase, supabaseAdmin } from '../config/database';
import { ApiError } from '../middleware/errorHandler';
import { Contact, PaginatedResponse } from '../types';
import { logger } from '../config/logger';

export class ContactService {
  static async createContact(contactData: Omit<Contact, 'id' | 'created_at'>): Promise<Contact> {
    try {
      const { data: contact, error } = await supabase
        .from('contacts')
        .insert({
          ...contactData,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        throw new ApiError(500, 'Failed to submit contact form');
      }

      logger.info('Contact form submitted successfully', { 
        contactId: contact.id, 
        email: contact.email 
      });
      
      return contact;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Create contact error:', error);
      throw new ApiError(500, 'Failed to submit contact form');
    }
  }

  static async getAllContacts(page = 1, limit = 10): Promise<PaginatedResponse<Contact>> {
    try {
      const offset = (page - 1) * limit;

      // Get total count
      const { count, error: countError } = await supabaseAdmin
        .from('contacts')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        throw new ApiError(500, 'Failed to get contact count');
      }

      // Get paginated contacts
      const { data: contacts, error } = await supabaseAdmin
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw new ApiError(500, 'Failed to fetch contacts');
      }

      const total = count || 0;
      const totalPages = Math.ceil(total / limit);

      return {
        data: contacts || [],
        total,
        page,
        limit,
        totalPages
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Get contacts error:', error);
      throw new ApiError(500, 'Failed to fetch contacts');
    }
  }

  static async deleteContact(id: string): Promise<void> {
    try {
      const { error } = await supabaseAdmin
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) {
        throw new ApiError(500, 'Failed to delete contact');
      }

      logger.info('Contact deleted successfully', { contactId: id });
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      logger.error('Delete contact error:', error);
      throw new ApiError(500, 'Failed to delete contact');
    }
  }
}