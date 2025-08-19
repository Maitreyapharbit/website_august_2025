"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("../../controllers/report.controller");
const auth_1 = require("../../middleware/auth");
const storage_1 = require("../../utils/storage");
const router = (0, express_1.Router)();
router.get('/compliance', auth_1.authenticate, report_controller_1.ReportController.compliance);
router.get('/temperature', auth_1.authenticate, report_controller_1.ReportController.temperature);
router.post('/export', auth_1.authenticate, report_controller_1.ReportController.export);
router.get('/audit-trails/:productId', auth_1.authenticate, report_controller_1.ReportController.auditTrail);
// upload compliance docs
router.post('/compliance/upload', auth_1.authenticate, storage_1.upload.single('file'), async (req, res, next) => {
    try {
        // Persist record
        const filePath = req.file?.path || '';
        // In a real app, validate and save into database
        return res.json({ success: true, path: filePath });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
