import { orderService } from '#services/user/order.service.js';

class OrderController {
  async createOrder(req, res, next) {
    try {
      const userId = req.user.id;
      const order = await orderService.createOrder(userId, req.body);
      res.status(201).json(order);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  async getOrders(req, res, next) {
    try {
      const userId = req.user.id;
      const orders = await orderService.getOrders(userId);
      res.status(201).json(orders);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
}

export const orderController = new OrderController();
