import { adminService } from '#services/admin/admin.service.js';

class AdminController {
  async getUsers(req, res) {
    try {
      const data = await adminService.getUsers(req.query, req.user);
      res.json(data);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  async postUser(req, res) {
    try {
      const user = await adminService.postUser(req.body);
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  async updateUser(req, res) {
    try {
      const { ids, data } = req.body;
      const updatedUser = await adminService.updateUser(ids, data, req.user?.id);
      res.json(updatedUser);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  async deleteUser(req, res) {
    try {
      const ids = req.params.id || req.body.ids;
      if (!ids) {
        throw new Error('id или ids обязательны');
      }
      const result = await adminService.deleteUser(ids, req.user?.id);
      res.json(result);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  }
  async getOrders(req, res, next) {
    try {
      const orders = await adminService.getOrders(req.user, req.query);
      res.json(orders);
    } catch (e) {
      res.status(400).json({ message: e.message });
      next();
    }
  }
  async getOneUser(req, res) {
    try {
      const user = await adminService.getOneUser(req.params.id);
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e.message });
      next();
    }
  }
}

export const adminController = new AdminController();
