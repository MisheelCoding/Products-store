import { adminStoresService } from '#services/admin/store.service.js';

class AdminStoresController {
  // *** create store
  async create(req, res, next) {
    try {
      const data = await adminStoresService.create(req.body);
      res.status(201).json(data);
    } catch (e) {
      res.status(400).json({ message: e.message });
      next();
    }
  }
  // ***

  async list(req, res, next) {
    try {
      const data = await adminStoresService.list(req.query);
      res.json(data);
    } catch (e) {
      res.status(400).json({ message: e.message });
      next();
    }
  }
  async getOne(req, res, next) {
    try {
      const store = await adminStoresService.getOne(req.params.id);
      res.json(store);
    } catch (e) {
      res.status(400).json({ message: e.message });
      next();
    }
  }
  async update(req, res, next) {
    try {
      const store = await adminStoresService.update(req.params.id, req.body);
      res.json(store);
    } catch (e) {
      res.status(400).json({ message: e.message });
      next();
    }
  }
  async remove(req, res, next) {
    try {
      await adminStoresService.remove(req.params.id);
      res.json({ message: 'Успешно удалено' });
    } catch (e) {
      res.status(400).json({ message: e.message });
      next();
    }
  }
  // async create() {
  //   try {
  //   } catch (e) {
  //     res.status(400).json({ message: e.message });
  //     next();
  //   }
  // }
}

export const adminStoresController = new AdminStoresController();
