import express from 'express';
import { adminController } from '#controllers/admin/admin.controller.js';
import { authMiddleware } from '#middlewares/auth/auth.js';
import { checkRole } from '#middlewares/auth/checkRole.js';

const router = express.Router();
// все эти роуты доступны только ADMIN и SUPER_ADMIN
router.use(authMiddleware, checkRole(['ADMIN', 'SUPER_ADMIN']));

// ==== USERS ====
router.get('/users', adminController.getUsers);
router.post('/users', adminController.postUser);
router.get('/users/:id', adminController.getOneUser);
router.patch('/users', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);
router.delete('/users', adminController.deleteUser);

// ==== ORDERS ====
router.get('/orders', adminController.getOrders);

export default router;
