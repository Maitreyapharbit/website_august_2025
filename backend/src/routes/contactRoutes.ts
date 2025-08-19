import { Router } from 'express';
import { ContactController } from '../controllers/contactController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { contactValidation, paginationValidation } from '../middleware/validation';

const router = Router();

// POST /api/contact - Submit contact form (public)
router.post('/', contactValidation, ContactController.submitContact);

// GET /api/contact - Get all contact submissions (admin only)
router.get('/', authenticateToken, requireAdmin, paginationValidation, ContactController.getAllContacts);

// DELETE /api/contact/:id - Delete contact submission (admin only)
router.delete('/:id', authenticateToken, requireAdmin, ContactController.deleteContact);

export default router;