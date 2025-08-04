import { adminService } from '#services/admin/admin.service.js';

class AdminController {
  async getUsers(req, res) {
    try {
      const filters = req.query;
      const data = await adminService.getUsers(filters);
      res.json(data);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  async postUser(req, res) {
    try {
      const { username, password, roles } = req.body;
      const user = await adminService.postUser({ username, password, roles });
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, roles } = req.body;
      const user = await adminService.updateUser(id, { username, roles });
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await adminService.deleteUser(id);
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  async getOrders(req, res, next) {
    try {
      const orders = await adminService.getOrders(req.user);
      res.json(orders);
    } catch (e) {
      res.status(400).json({ message: e.message });
      next();
    }
  }
  // async postUser(req, res) {
  //   try {
  //   } catch (e) {}
  // }
}

export const adminController = new AdminController();
