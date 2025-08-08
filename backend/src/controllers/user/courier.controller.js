import { courierService } from '#services/user/courier.service.js';

class CourierContoller {
  async getMyOrders(req, res, next) {
    try {
      const orders = await courierService.getMyOrders(req.user.id);
      res.json(orders);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }

  async upadateOrderStatus(req, res, next) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const updated = await courierService.updateOrderStatus(orderId, req.user.id, status);
      res.json(updated);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
}

export const courierContoller = new CourierContoller();
