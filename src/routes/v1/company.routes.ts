import { Router } from 'express';
import { CompanyController } from '../../controllers/company.controller';
import { authenticate, authorize } from '../../middleware/auth';

const router = Router();

router.get('/', authenticate, CompanyController.list);
router.post('/', authenticate, authorize('ADMIN'), CompanyController.create);
router.get('/:id', authenticate, CompanyController.get);
router.put('/:id', authenticate, authorize('ADMIN'), CompanyController.update);
router.delete('/:id', authenticate, authorize('ADMIN'), CompanyController.remove);

export default router;