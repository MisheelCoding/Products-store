// src/services/admin/order.service.js
import { ORDER } from '#models/Order.js';
import { USER } from '#models/User.js';
import { sanitizePagination } from '#utils/limitPage.js';

const ALLOWED_STATUSES = ['pending', 'confirmed', 'delivering', 'completed', 'cancelled'];

class AdminOrderService {
  // Заказы для текущего админа:
  // SUPER_ADMIN видит все, обычный ADMIN — по своему store (если есть) иначе по region
  async getStoreOrders(currentUser, { page = 1, limit = 20, status, userId } = {}) {
    ({ page, limit } = sanitizePagination(page, limit));

    const filter = {};
    if (status) filter.status = status;
    if (userId) filter.user = userId;

    const isSuper = currentUser.roles?.includes('SUPER_ADMIN');
    if (!isSuper) {
      if (currentUser.store) filter.store = currentUser.store;
      else if (currentUser.region) filter.region = currentUser.region;
    }

    const [items, total] = await Promise.all([
      ORDER.find(filter)
        .sort({ createdAt: -1 })
        .populate('user', 'username email')
        .populate('courier', 'username roles')
        .populate('items.product', 'title imageUrl')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ORDER.countDocuments(filter),
    ]);

    return { items, total, page, totalPages: Math.ceil(total / limit) };
  }

  // Назначить курьера (по умолчанию сразу перевести в "confirmed")
  async assignCourier(orderId, courierId, status = 'confirmed') {
    const order = await ORDER.findById(orderId);
    if (!order) throw new Error('Заказ не найден');

    const courier = await USER.findById(courierId).lean();
    if (!courier) throw new Error('Курьер не найден');
    if (!courier.roles?.includes('COURIER')) {
      throw new Error('Пользователь не имеет роли COURIER');
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      throw new Error('Недопустимый статус');
    }

    order.courier = courier._id;
    order.status = status;
    await order.save();

    return await ORDER.findById(order._id)
      .populate('user', 'username email')
      .populate('courier', 'username roles')
      .populate('items.product', 'title imageUrl')
      .lean();
  }

  // Обновить только статус
  async updateOrderStatus(orderId, status) {
    if (!ALLOWED_STATUSES.includes(status)) {
      throw new Error('Недопустимый статус');
    }

    const updated = await ORDER.findByIdAndUpdate(orderId, { $set: { status } }, { new: true })
      .populate('user', 'username email')
      .populate('courier', 'username roles')
      .populate('items.product', 'title imageUrl')
      .lean();

    if (!updated) throw new Error('Заказ не найден');
    return updated;
  }

  // Получить один заказ
  async getOrderById(orderId) {
    const order = await ORDER.findById(orderId)
      .populate('user', 'username email')
      .populate('courier', 'username roles')
      .populate('items.product', 'title imageUrl')
      .lean();

    if (!order) throw new Error('Заказ не найден');
    return order;
  }
}

export const adminOrderService = new AdminOrderService();
