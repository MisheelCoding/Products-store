import express from 'express';
import { adminController } from '#controllers/admin/admin.controller.js';
import { authMiddleware } from '#middlewares/auth/auth.js';
import { checkRole } from '#middlewares/auth/checkRole.js';

const router = express.Router();

router.get('/users', authMiddleware, checkRole(['ADMIN']), adminController.getUsers);

export default router;
