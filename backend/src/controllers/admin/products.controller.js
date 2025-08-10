// src/controllers/admin/product.controller.js
import mongoose from 'mongoose';
import { adminProductService } from '#services/admin/products.service.js';

class AdminProductController {
  async create(req, res) {
    try {
      const { store } = req.body;
      if (!mongoose.Types.ObjectId.isValid(store)) {
        return res.status(400).json({ message: 'Invalid store id' });
      }

      // пробрасываем всё тело, сервис сам отфильтрует нужные поля
      const doc = await adminProductService.create(req.body);
      return res.status(201).json(doc);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async updateBasic(req, res) {
    try {
      const doc = await adminProductService.updateBasic(req.params.id, req.body);
      if (!doc) return res.status(404).json({ message: 'Товар не найден' });
      return res.json(doc);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async setPrice(req, res) {
    try {
      const doc = await adminProductService.setPrice(req.params.id, req.body);
      if (!doc) return res.status(404).json({ message: 'Товар не найден' });
      return res.json(doc);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async setStock(req, res) {
    try {
      const doc = await adminProductService.setStock(req.params.id, req.body);
      if (!doc) return res.status(404).json({ message: 'Товар не найден' });
      return res.json(doc);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async getById(req, res) {
    try {
      const doc = await adminProductService.getById(req.params.id);
      if (!doc) return res.status(404).json({ message: 'Товар не найден' });
      return res.json(doc);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async list(req, res) {
    try {
      const data = await adminProductService.list(req.query);
      return res.json(data);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async remove(req, res) {
    try {
      const result = await adminProductService.remove(req.params.id);
      return res.json(result);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
}
export const adminProductController = new AdminProductController();
