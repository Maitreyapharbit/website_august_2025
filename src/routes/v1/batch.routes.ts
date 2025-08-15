import { Router } from 'express';
import { BatchController } from '../../controllers/product.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.get('/:batchId', authenticate, BatchController.get);
router.put('/:batchId/location', authenticate, BatchController.updateLocation);
router.put('/:batchId/status', authenticate, BatchController.updateStatus);

export default router;