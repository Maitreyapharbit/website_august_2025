"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactController_1 = require("../controllers/contactController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post('/', validation_1.contactValidation, contactController_1.ContactController.submitContact);
router.get('/', auth_1.authenticateToken, auth_1.requireAdmin, validation_1.paginationValidation, contactController_1.ContactController.getAllContacts);
router.delete('/:id', auth_1.authenticateToken, auth_1.requireAdmin, contactController_1.ContactController.deleteContact);
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map