import { ORDER } from '#models/Order.js';

class OrderService {
  async createOrder(userId, { items, address, region, phone }) {
    // total price
    const totalAmount = items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
    // save order
    const newOrder = await ORDER.create({
      user: userId,
      items,
      totalAmount,
      address,
      region,
      phone,
    });

    return newOrder;
  }

  async getUserOrders(userId) {
    return await ORDER.find({ user: userId }).populate('items.product');
  }
}

export const orderService = new OrderService();
