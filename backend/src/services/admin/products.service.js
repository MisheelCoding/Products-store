// src/services/admin/products.service.js
import { PRODUCT } from '#models/Product.js';

export class AdminProductService {
  async create(payload) {
    const {
      title,
      category,
      unit,
      store,
      imageUrl,
      quantityStep = 1,
      isAvailable = true,
      stockByStore = {},
      availabilityByStore = {},
      price = {},
    } = payload;

    return PRODUCT.create({
      title,
      category,
      unit,
      store,
      imageUrl,
      quantityStep,
      isAvailable,
      stockByStore,
      availabilityByStore,
      price,
    });
  }

  async updateBasic(id, data) {
    const allowed = ['title', 'category', 'unit', 'imageUrl', 'quantityStep', 'isAvailable'];
    const payload = {};
    for (const k of allowed) if (data[k] !== undefined) payload[k] = data[k];
    return PRODUCT.findByIdAndUpdate(id, payload, { new: true });
  }

  async setPrice(id, { storeKey, current, old, discountPercent }) {
    const base = `price.${storeKey}`;
    const $set = {};
    if (current !== undefined) $set[`${base}.current`] = current;
    if (old !== undefined) $set[`${base}.old`] = old;
    if (discountPercent !== undefined) $set[`${base}.discountPercent`] = discountPercent;

    return PRODUCT.findByIdAndUpdate(id, { $set }, { new: true });
  }

  async setStock(id, { storeKey, stock }) {
    const stockPath = `stockByStore.${storeKey}`;
    const availPath = `availabilityByStore.${storeKey}`;
    return PRODUCT.findByIdAndUpdate(
      id,
      { $set: { [stockPath]: stock, [availPath]: stock > 0 } },
      { new: true },
    );
  }

  async adjustStock(id, { storeKey, delta }) {
    const stockPath = `stockByStore.${storeKey}`;
    const prod = await PRODUCT.findById(id).lean();
    const cur = prod?.stockByStore?.[storeKey] ?? 0;
    if (cur + delta < 0) throw new Error('Недостаточно товара');

    await PRODUCT.findByIdAndUpdate(id, { $inc: { [stockPath]: delta } });
    const next = cur + delta;
    const availPath = `availabilityByStore.${storeKey}`;
    await PRODUCT.findByIdAndUpdate(id, { $set: { [availPath]: next > 0 } });
    return { productId: id, storeKey, stock: next };
  }

  async getById(id) {
    return PRODUCT.findById(id);
  }

  async list({ q, category, page = 1, limit = 20 }) {
    const filter = {};
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (category) filter.category = category;

    page = Math.max(parseInt(page) || 1, 1);
    limit = Math.min(Math.max(parseInt(limit) || 20, 1), 100);

    const [items, total] = await Promise.all([
      PRODUCT.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      PRODUCT.countDocuments(filter),
    ]);

    return { items, total, page, totalPages: Math.ceil(total / limit) };
  }

  async remove(id) {
    await PRODUCT.findByIdAndDelete(id);
    return { ok: true };
  }
}
export const adminProductService = new AdminProductService();
