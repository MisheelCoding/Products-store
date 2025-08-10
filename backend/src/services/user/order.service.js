import { ORDER } from '#models/Order.js';
import { adminProductService } from '#services/admin/products.service.js'; // для списания остатков

class OrderService {
  async createOrder(userId, { items, address, region, phone, storeKey }) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('Пустая корзина');
    }
    if (!storeKey) throw new Error('Не указан магазин (storeKey)');

    // 1) базовая валидация + подсчет суммы
    let totalAmount = 0;
    for (const it of items) {
      if (!it.product) throw new Error('Нет product');
      if (!it.quantity || it.quantity <= 0) throw new Error('quantity должен быть > 0');
      if (!it.price || it.price <= 0) throw new Error('price должен быть > 0');
      totalAmount += it.price * it.quantity;
    }

    // 2) списание остатков по каждому товару
    for (const it of items) {
      await adminProductService.adjustStock(it.product, {
        storeKey,
        delta: -it.quantity, // списываем
      });
    }

    // 3) сохранить заказ
    const order = await ORDER.create({
      user: userId,
      items, // [{ product, quantity, price }]
      totalAmount,
      address,
      region,
      phone,
      status: 'pending',
      // при желании можно сохранить storeKey на уровне заказа
    });

    return order;
  }

  async getUserOrders(userId) {
    return ORDER.find({ user: userId }).populate('items.product');
  }
}

export const orderService = new OrderService();
