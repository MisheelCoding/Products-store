import { productsController } from '#controllers/public/products.controller.js';
import express from 'express';

const router = express.Router();

router.get('/products', productsController.list);
router.get('/products/:id', productsController.getOne);
router.get('/products/categories', productsController.categories);

export default router;
