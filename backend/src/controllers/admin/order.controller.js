import { adminOrderService } from '#services/admin/order.service.js';

class AdminOrderController {
  async getStoreOrders(req, res, next) {
    try {
      const orders = await adminOrderService.getStoreOrders(req.user.id);
      res.json(orders);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  async assignCourier(req, res, next) {
    try {
      const { orderId } = req.params.orderId;
      const { courierId } = req.body;
      const updateOrder = await adminOrderService.updateOrderStatus(orderId, courierId);
      res.json(updateOrder);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  async updateOrderStatus(req, res, next) {
    try {
      const { orderId } = req.params.orderId;
      const { status } = req.body;
      const updated = await adminOrderService.updateOrderStatus(orderId, status);
      res.json(updated);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  async getOrderByid(req, res, next) {
    try {
      const order = await adminOrderService.getOrderByid(req.params.orderId);
      res.json(order);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
}
export const adminOrderController = new AdminOrderController();
