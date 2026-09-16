import { Router } from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import validate from '../middlewares/validate.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { registerSchema, loginSchema } from '../validations/authValidation.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login',    validate(loginSchema),    login);
router.post('/logout',                             logout);

router.get('/me', authMiddleware, getMe);

export default router;