"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const database_1 = require("../config/database");
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../config/logger");
class ContactService {
    static async createContact(contactData) {
        try {
            const { data: contact, error } = await database_1.supabase
                .from('contacts')
                .insert({
                ...contactData,
                created_at: new Date().toISOString()
            })
                .select()
                .single();
            if (error) {
                throw new errorHandler_1.ApiError(500, 'Failed to submit contact form');
            }
            logger_1.logger.info('Contact form submitted successfully', {
                contactId: contact.id,
                email: contact.email
            });
            return contact;
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            logger_1.logger.error('Create contact error:', error);
            throw new errorHandler_1.ApiError(500, 'Failed to submit contact form');
        }
    }
    static async getAllContacts(page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit;
            const { count, error: countError } = await database_1.supabaseAdmin
                .from('contacts')
                .select('*', { count: 'exact', head: true });
            if (countError) {
                throw new errorHandler_1.ApiError(500, 'Failed to get contact count');
            }
            const { data: contacts, error } = await database_1.supabaseAdmin
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false })
                .range(offset, offset + limit - 1);
            if (error) {
                throw new errorHandler_1.ApiError(500, 'Failed to fetch contacts');
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
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            logger_1.logger.error('Get contacts error:', error);
            throw new errorHandler_1.ApiError(500, 'Failed to fetch contacts');
        }
    }
    static async deleteContact(id) {
        try {
            const { error } = await database_1.supabaseAdmin
                .from('contacts')
                .delete()
                .eq('id', id);
            if (error) {
                throw new errorHandler_1.ApiError(500, 'Failed to delete contact');
            }
            logger_1.logger.info('Contact deleted successfully', { contactId: id });
        }
        catch (error) {
            if (error instanceof errorHandler_1.ApiError) {
                throw error;
            }
            logger_1.logger.error('Delete contact error:', error);
            throw new errorHandler_1.ApiError(500, 'Failed to delete contact');
        }
    }
}
exports.ContactService = ContactService;
//# sourceMappingURL=contactService.js.map