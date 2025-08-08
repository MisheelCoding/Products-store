import express from 'express';
import authRoute from '#routes/shared/Auth.route.js';
import adminRoute from '#routes/admin/Admin.route.js';
import courierRoute from '#routes/courier/courier.route.js';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/admin', adminRoute);
router.use('/courier', courierRoute);

export default router;
