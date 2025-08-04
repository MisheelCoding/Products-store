import { authController } from '#controllers/shared/auth.controller.js';
import { authMiddleware } from '#middlewares/auth/auth.js';
import express from 'express';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh', authMiddleware, authController.refreshToken);
router.post('/logout', authMiddleware, authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.post('/change-password', authMiddleware, authController.changePassword);
router.post('/verify-email', authMiddleware, authController.verifyEmail);
router.post('/resend-verification-code', authMiddleware, authController.resendVerificationCode);

export default router;
