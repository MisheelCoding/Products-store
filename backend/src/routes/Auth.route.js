import { authController } from '#controllers/shared/auth.controller.js';
import express from 'express';

const router = express.Router();

router.post('/auth/login', authController.login);

export default router;
