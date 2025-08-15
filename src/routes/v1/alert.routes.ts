import { Router } from 'express';
import { AlertController } from '../../controllers/alert.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.get('/', authenticate, AlertController.list);

export default router;