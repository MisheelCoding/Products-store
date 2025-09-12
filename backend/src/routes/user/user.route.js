import { userController } from '#controllers/user/user.controller.js';
import { authMiddleware } from '#middlewares/auth/auth.js';
import express from 'express';

const router = express.Router();

router.get('/favorites', userController.getFavorites);
router.post('/favorites', userController.addToFavorites);
router.delete('/favorites', userController.removeFromFavorites);

router.use(authMiddleware);

export default router;
