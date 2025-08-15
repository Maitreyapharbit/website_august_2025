import { Router } from 'express';
import { ReportController } from '../../controllers/report.controller';
import { authenticate } from '../../middleware/auth';
import { upload } from '../../utils/storage';

const router = Router();

router.get('/compliance', authenticate, ReportController.compliance);
router.get('/temperature', authenticate, ReportController.temperature);
router.post('/export', authenticate, ReportController.export);
router.get('/audit-trails/:productId', authenticate, ReportController.auditTrail);

// upload compliance docs
router.post('/compliance/upload', authenticate, upload.single('file'), async (req, res, next) => {
	try {
		// Persist record
		const filePath = (req.file as any)?.path || '';
		// In a real app, validate and save into database
		return res.json({ success: true, path: filePath });
	} catch (err) { next(err); }
});

export default router;