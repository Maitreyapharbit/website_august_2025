"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contactService_1 = require("../services/contactService");
class ContactController {
    static async submitContact(req, res, next) {
        try {
            const contactData = req.body;
            const contact = await contactService_1.ContactService.createContact(contactData);
            const response = {
                success: true,
                message: 'Contact form submitted successfully. We will get back to you within 24 hours.',
                data: contact
            };
            res.status(201).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async getAllContacts(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await contactService_1.ContactService.getAllContacts(page, limit);
            const response = {
                success: true,
                message: 'Contacts retrieved successfully',
                data: result
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteContact(req, res, next) {
        try {
            const { id } = req.params;
            await contactService_1.ContactService.deleteContact(id);
            const response = {
                success: true,
                message: 'Contact deleted successfully'
            };
            res.status(200).json(response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=contactController.js.map