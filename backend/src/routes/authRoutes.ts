import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { loginValidation } from '../middleware/validation';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// POST /api/auth/login - Admin login
router.post('/login', loginValidation, AuthController.login);

// POST /api/auth/logout - Admin logout
router.post('/logout', AuthController.logout);

// GET /api/auth/verify - Verify JWT token
router.get('/verify', AuthController.verify);

export default router;