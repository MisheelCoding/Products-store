import { orderController } from '#controllers/user/order.controller.js';
import { userController } from '#controllers/user/user.controller.js';
import { authMiddleware } from '#middlewares/auth/auth.js';
import express from 'express';

const router = express.Router();
router.use(authMiddleware);

// *** get actual Profileinfo
router.get('/me', userController.getProfile);

// *** favorite routes
router.get('/favorites', userController.getFavorites);
router.post('/favorites', userController.addToFavorites);
router.delete('/favorites', userController.removeFromFavorites);

// ***addreses
router.get('/addresses', userController.getAddresses);
router.post('/addresses', userController.addAddress);
router.put('/addresses/:addressId', userController.updateAddress);
router.delete('/addresses/:addressId', userController.deleteAddress);

// ***number
router.put('/phone', userController.saveNumber);
router.delete('/phone', userController.deleteNumber);

// *** order
router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);

export default router;
