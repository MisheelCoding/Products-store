import express from 'express';
import { authMiddleware } from '#middlewares/auth/auth.js';
import { checkRole } from '#middlewares/auth/checkRole.js';
import { courierContoller } from '#controllers/courier/courier.controller.js';

const router = express.Router();

router.use(authMiddleware, checkRole(['COURIER']));
// Получить все заказы, назначенные курьеру
router.get('/orders', courierContoller.getMyOrders);
// Обновить статус заказа (например, доставлен)
router.patch('/orders/:orderId/status', courierContoller.upadateOrderStatus);

export default router;
