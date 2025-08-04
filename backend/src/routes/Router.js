import express from 'express';
import authRoute from '#routes/Auth.route.js';
import adminRoute from '#routes/Admin.route.js';
const router = express.Router();

router.use('/auth', authRoute);
router.use('/admin', adminRoute);

export default router;
