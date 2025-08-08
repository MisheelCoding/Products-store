import { adminOrderController } from '#controllers/admin/order.controller.js';
import { authMiddleware } from '#middlewares/auth/auth.js';
import { checkRole } from '#middlewares/auth/checkRole.js';
import express from 'express';

const router = express.Router();

//middlewares
router.use(authMiddleware, checkRole(['ADMIN']));

router.get('/orders', adminOrderController.getStoreOrders);
router.get('/orders/:orderId', adminOrderController.getOrderByid);
router.patch('/orders/:orderId/status', adminOrderController.updateOrderStatus);
router.patch('/orders/:orderId/courier', adminOrderController.assignCourier);

export default router;
