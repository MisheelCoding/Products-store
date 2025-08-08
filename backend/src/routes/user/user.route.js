import { authMiddleware } from '#middlewares/auth/auth.js';
import express from 'express';

const router = express.Router();

router.use(authMiddleware);

export default router;
