import { Router } from 'express';
import { celebrate } from 'celebrate';
import { productCreateSchema, batchCreateSchema } from '../../validation/schemas';
import { ProductController, BatchController } from '../../controllers/product.controller';
import { authenticate, authorize } from '../../middleware/auth';

const router = Router();

router.post('/', authenticate, authorize('COMPANY', 'ADMIN'), celebrate(productCreateSchema), ProductController.create);
router.get('/', authenticate, ProductController.list);
router.get('/:id', authenticate, ProductController.get);
router.post('/:id/batches', authenticate, authorize('COMPANY', 'ADMIN'), celebrate(batchCreateSchema), BatchController.create);

export default router;