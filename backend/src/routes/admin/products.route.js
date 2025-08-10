// src/routes/admin/product.route.js
import express from 'express';
import { adminProductController } from '#controllers/admin/products.controller.js';
import { authMiddleware } from '#middlewares/auth/auth.js';
import { checkRole } from '#middlewares/auth/checkRole.js';

const router = express.Router();
router.use(authMiddleware, checkRole(['ADMIN', 'SUPER_ADMIN']));

router.post('/products', adminProductController.create);
router.get('/products', adminProductController.list);
router.get('/products/:id', adminProductController.getById);
router.patch('/products/:id', adminProductController.updateBasic);
router.patch('/products/:id/price', adminProductController.setPrice);
router.patch('/products/:id/stock', adminProductController.setStock);
router.delete('/products/:id', adminProductController.remove);

export default router;
