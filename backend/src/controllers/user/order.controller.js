import { ORDER } from '#models/Order.js';

class OrderController {
  async createOrder(req, res, next) {
    try {
      const userId = req.user.id;
      const order = await ORDER.create();
    } catch (e) {
      res.status(400).json({ message: e });
    }
  }
}
