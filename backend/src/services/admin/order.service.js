import { ORDER } from '#models/Order.js';
import { STORE } from '#models/Store.js';

class AdminOrderService {
  async getStoreOrders(adminId) {
    const store = await STORE.findOne({ admins: adminId });
    if (!store) throw new Error(`Магазин не найден`);

    return await ORDER.findOne({ region: store.region }).populate('user courier items.product');
  }
  async assignCourier(orderId, courierId) {
    return await ORDER.findOneAndUpdate(orderId, { courier: courierId }, { new: true }).populate(
      'courier',
    );
  }
  async updateOrderStatus(orderId, status) {
    return await ORDER.findOneAndUpdate(orderId, { status }, { new: true });
  }
  async getOrderByid(orderId) {
    return await ORDER.findById(orderId).populate('user courier items.product');
  }
}

export const adminOrderService = new AdminOrderService();
