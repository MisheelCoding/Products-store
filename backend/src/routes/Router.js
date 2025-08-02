import express from 'express';
import authRoute from '#routes/Auth.route.js';
const router = express.Router();

router.use('/auth', authRoute);

export default router;
