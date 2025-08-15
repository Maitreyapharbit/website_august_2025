import { Router } from 'express';
import { celebrate } from 'celebrate';
import { sensorRegisterSchema, sensorDataSchema } from '../../validation/schemas';
import { SensorController } from '../../controllers/sensor.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.post('/register', authenticate, celebrate(sensorRegisterSchema), SensorController.register);
router.post('/:sensorId/data', authenticate, celebrate(sensorDataSchema), SensorController.pushData);
router.get('/:sensorId/data', authenticate, SensorController.history);
router.post('/:sensorId/alerts', authenticate, SensorController.createAlert);
router.get('/alerts/company', authenticate, SensorController.listAlerts);

export default router;