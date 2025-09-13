import { ORDER } from '#models/Order.js';

class CourierService {
  async getMyOrders(courierId) {
    return await ORDER.find({ user: courierId }).populate('items.product');
  }

  async updateOrderStatus(orderId, courierId, status) {
    const order = await ORDER.findOne({ _id: orderId, courier: courierId });
    if (!order) throw new Error('Заказ не найден или не ваш');

    order.status = status;
    await order.save();
    return order;
  }
}

export const courierService = new CourierService();
