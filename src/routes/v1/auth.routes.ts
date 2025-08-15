import { Router } from 'express';
import { celebrate } from 'celebrate';
import { registerSchema, loginSchema, refreshSchema, profileUpdateSchema, forgotPasswordSchema, resetPasswordSchema } from '../../validation/schemas';
import { AuthController } from '../../controllers/auth.controller';
import { authenticate } from '../../middleware/auth';

const router = Router();

router.post('/register', celebrate(registerSchema), AuthController.register);
router.post('/login', celebrate(loginSchema), AuthController.login);
router.post('/refresh-token', celebrate(refreshSchema), AuthController.refresh);
router.get('/profile', authenticate, AuthController.profile);
router.put('/profile', authenticate, celebrate(profileUpdateSchema), AuthController.updateProfile);
router.post('/forgot-password', celebrate(forgotPasswordSchema), AuthController.forgotPassword);
router.post('/reset-password', celebrate(resetPasswordSchema), AuthController.resetPassword);

export default router;