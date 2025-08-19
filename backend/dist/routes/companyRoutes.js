"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyController_1 = require("../controllers/companyController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.get('/', companyController_1.CompanyController.getCompanyInfo);
router.put('/', auth_1.authenticateToken, auth_1.requireAdmin, validation_1.updateCompanyValidation, companyController_1.CompanyController.updateCompanyInfo);
exports.default = router;
//# sourceMappingURL=companyRoutes.js.map