import { Router } from 'express';
import authRouter from '../../routes/v1/auth.routes';
import companyRouter from '../../routes/v1/company.routes';
import productRouter from '../../routes/v1/product.routes';
import batchRouter from '../../routes/v1/batch.routes';
import sensorRouter from '../../routes/v1/sensor.routes';
import shipmentRouter from '../../routes/v1/shipment.routes';
import reportRouter from '../../routes/v1/report.routes';
import analyticsRouter from '../../routes/v1/analytics.routes';
import alertsRouter from '../../routes/v1/alert.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/companies', companyRouter);
router.use('/products', productRouter);
router.use('/batches', batchRouter);
router.use('/sensors', sensorRouter);
router.use('/shipments', shipmentRouter);
router.use('/reports', reportRouter);
router.use('/', analyticsRouter);
router.use('/alerts', alertsRouter);

export default router;