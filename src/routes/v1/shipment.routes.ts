import { Router } from 'express';
import { celebrate } from 'celebrate';
import { shipmentCreateSchema, checkpointSchema } from '../../validation/schemas';
import { ShipmentController } from '../../controllers/shipment.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.post('/', authenticate, celebrate(shipmentCreateSchema), ShipmentController.create);
router.get('/', authenticate, ShipmentController.list);
router.get('/:id', authenticate, ShipmentController.get);
router.put('/:id/checkpoint', authenticate, celebrate(checkpointSchema), ShipmentController.addCheckpoint);
router.get('/:id/history', authenticate, ShipmentController.history);

export default router;