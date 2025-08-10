// controllers/public/products.controller.js
import { productsService } from '#services/public/products.service.js';

class ProductsController {
  async list(req, res) {
    try {
      const { q, category, limit, page, region, store, sort } = req.query;
      const data = await productsService.list({ q, category, limit, page, region, store, sort });
      res.json(data);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  // ***
  async getOne(req, res) {
    try {
      const { id } = req.params;
      const { region, store } = req.query;
      const product = await productsService.getOne(id, { region, store });
      if (!product) return res.status(404).json({ message: 'Товар не найден' });
      res.json(product);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  // ***
  async categories(req, res, next) {
    try {
      const { region, store } = req.query;
      const cats = await productsService.categories({ region, store });
      res.json({ categories: cats }); // единый формат
    } catch (e) {
      next(e);
    }
  }
}

export const productsController = new ProductsController();
