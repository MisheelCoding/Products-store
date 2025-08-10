import { orderService } from '#services/user/order.service.js';

class OrderController {
  async createOrder(req, res, next) {
    try {
      const userId = req.user.id; // из auth middleware
      const order = await orderService.createOrder(userId, req.body);
      return res.status(201).json(order);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }

  async getOrders(req, res, next) {
    try {
      const userId = req.user.id;
      const orders = await orderService.getUserOrders(userId); // ← имя метода исправил
      return res.status(200).json(orders);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  }
}

export const orderController = new OrderController();
