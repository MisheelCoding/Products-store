import { adminStoresController } from '#controllers/admin/store.controller.js';
import express from 'express';

const router = express.Router();
// Создать магазин
router.post('/', adminStoresController.create);
// Список магазинов (с пагинацией и фильтрами)
router.get('/', adminStoresController.list);

// Один магазин по ID
router.get('/:id', adminStoresController.getOne);

// Обновить магазин
router.put('/:id', adminStoresController.update);

// Удалить магазин
router.delete('/:id', adminStoresController.remove);
export default router;
