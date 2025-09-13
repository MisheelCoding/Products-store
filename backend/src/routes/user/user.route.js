import { orderController } from '#controllers/user/order.controller.js';
import { userController } from '#controllers/user/user.controller.js';
import { authMiddleware } from '#middlewares/auth/auth.js';
import express from 'express';

const router = express.Router();
router.use(authMiddleware);

// *** favorite routes
router.get('/favorites', userController.getFavorites);
router.post('/favorites', userController.addToFavorites);
router.delete('/favorites', userController.removeFromFavorites);

// ***addreses
router.get('/address', userController.getAddresses);
router.post('/address', userController.addAddress);
router.delete('/address', userController.deleteAddress);

// *** order
router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);

export default router;
