// src/controllers/admin/order.controller.js
import { adminOrderService } from '#services/admin/order.service.js';

class AdminOrderController {
  // список заказов для текущего админа/супера (с фильтрами и пагинацией по желанию)
  async getStoreOrders(req, res) {
    try {
      const data = await adminOrderService.getStoreOrders(req.user, req.query);
      res.json(data);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  // назначить курьера (и опционально сразу поменять статус, например "assigned")
  async assignCourier(req, res) {
    try {
      const { orderId } = req.params;
      const { courierId, status } = req.body; // status опционален
      const updated = await adminOrderService.assignCourier(
        orderId,
        courierId,
        status || 'confirmed',
      );
      res.json(updated);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  // поменять только статус
  async updateOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const updated = await adminOrderService.updateOrderStatus(orderId, status);
      res.json(updated);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }

  // получить один заказ
  async getOrderById(req, res) {
    try {
      const { orderId } = req.params;
      const order = await adminOrderService.getOrderById(orderId);
      if (!order) return res.status(404).json({ message: 'Заказ не найден' });
      res.json(order);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
}

export const adminOrderController = new AdminOrderController();
