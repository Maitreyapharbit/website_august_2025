import { Router } from 'express';
import { CompanyController } from '../controllers/companyController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { updateCompanyValidation } from '../middleware/validation';

const router = Router();

// GET /api/company - Get company details (public)
router.get('/', CompanyController.getCompanyInfo);

// PUT /api/company - Update company details (admin only)
router.put('/', authenticateToken, requireAdmin, updateCompanyValidation, CompanyController.updateCompanyInfo);

export default router;