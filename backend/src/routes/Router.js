import express from 'express';
import authRoute from '#routes/shared/Auth.route.js';
import adminRoute from '#routes/admin/Admin.route.js';
import adminOrderRoute from '#routes/admin/order.route.js';
import adminProductsRoute from '#routes/admin/products.route.js';
import adminStoresRoute from '#routes/admin/store.route.js';
import courierRoute from '#routes/courier/courier.route.js';
import publicProductsRoute from '#routes/public/products.route.js';
const router = express.Router();

router.use('/auth', authRoute);
// *** ADMIN
router.use('/admin', adminOrderRoute);
router.use('/admin', adminProductsRoute);
router.use('/admin', adminRoute);
router.use('/admin/stores', adminStoresRoute);
// *** COURIER
router.use('/courier', courierRoute);
// *** PUBLIC
router.use('/public', publicProductsRoute);
// **

// import setupRoutes from '#routes/setup.js';
// router.use('/setup', setupRoutes);

export default router;
