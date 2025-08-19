"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.post('/login', validation_1.loginValidation, authController_1.AuthController.login);
router.post('/logout', authController_1.AuthController.logout);
router.get('/verify', authController_1.AuthController.verify);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map