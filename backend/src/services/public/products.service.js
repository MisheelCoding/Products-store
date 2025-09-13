// src/services/public/products.service.js
import { PRODUCT } from '#models/Product.js';
import { clamp } from '#utils/limitPage.js';
import mapProduct from '#utils/mapProduct.js';

const DEF_STORE = process.env.DEFAULT_STORE || 'default';

class ProductsService {
  async list({ q, category, limit = 4, page = 1, region = 'default', store, sort }) {
    const storeKey = store || region || DEF_STORE;

    const filter = { isAvailable: true };
    if (q) filter.title = { $regex: q, $options: 'i' };
    if (category) filter.category = category;
    // требуем наличие цены для указанного storeKey
    filter[`price.${storeKey}`] = { $exists: true };

    let sortOption = { createdAt: -1 }; // по умолчанию — новые первыми
    if (sort === 'price_asc')
      sortOption = { [`price.${storeKey}.current`]: 1 }; // сначала дешёвые -  потом дорогие
    else if (sort === 'price_desc')
      sortOption = { [`price.${storeKey}.current`]: -1 }; // сначала дорогие → потом дешёвые
    else if (sort === 'title_asc') sortOption = { title: 1 };
    else if (sort === 'title_desc') sortOption = { title: -1 };

    page = clamp(parseInt(page) || 1, 1, Number.MAX_SAFE_INTEGER);
    limit = clamp(parseInt(limit) || 20, 1, 100);

    const [items, total] = await Promise.all([
      PRODUCT.find(filter)
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      PRODUCT.countDocuments(filter),
    ]);

    const mapped = items.map((p) => mapProduct(p, storeKey));

    return {
      items: mapped,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      storeKey,
    };
  }

  async getOne(id, { region = 'default', store } = {}) {
    const storeKey = store || region || DEF_STORE;
    const doc = await PRODUCT.findById(id).lean();
    if (!doc) return null;
    mapProduct(doc, storeKey);
  }

  async categories({ region = 'default', store } = {}) {
    const storeKey = store || region || DEF_STORE;
    return PRODUCT.distinct('category', {
      isAvailable: true,
      [`price.${storeKey}`]: { $exists: true },
    });
  }
}

export const productsService = new ProductsService();
