import { authController } from '#controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

router.get('/auth/data', authController.log);

export default router;
