import { STORE } from '#models/Store.js';
import { sanitizePagination } from '#utils/limitPage.js';

class AdminStoresService {
  // *** create store
  async create(payload) {
    if (!payload.region) throw new Error(`Region обязательно!`);
    return await STORE.create(payload);
  }
  // ***

  async list({ page = 1, limit = 10, ...filters }) {
    ({ page, limit } = sanitizePagination(page, limit));

    const [items, total] = await Promise.all([
      STORE.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      STORE.countDocuments(),
    ]);
    return { items, total, page, totalPages: Math.ceil(total / limit) };
  }
  async getOne(id) {
    if (!id) throw new Error(`ID обязателен`);
    const store = await STORE.findById(id);
    if (!store) throw new Error(`такой магазин не найден`);
    return store;
  }
  async update(id, data) {
    const store = await STORE.findByIdAndUpdate(id, data, { new: true });
    return store;
  }
  async remove(id) {
    return await STORE.findByIdAndDelete(id);
  }
  // async create() {}
}

export const adminStoresService = new AdminStoresService();
