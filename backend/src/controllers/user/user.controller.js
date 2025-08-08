import { userService } from '#services/user/user.service.js';

class UserController {
  // *** Получть текущего
  async getProfile(req, res, next) {
    try {
      const profile = await userService.getProfile(req.user.id);
      res.json(profile);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }

  // *** обновить данные
  async updateProfile(req, res, next) {
    try {
      const updated = await userService.updateProfile(req.user.id, req.body);
      res.json(updated);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  // *** поменять парль
  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      await userService.changePassword(req.user.id, currentPassword, newPassword);
      res.json({ message: 'Пароль обновлен' });
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  // *** получить все свои закзы старые новые
  async getMyOrders(req, res, next) {
    try {
      const orders = await userService.getMyOrders(req.user.id);
      res.json(orders);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  // *** получить сохранненные
  async getFavorites(req, res, next) {
    try {
      const favorites = await userService.getFavorites(req.user.id);
      res.json(favorites);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  // *** добавить в сохранные
  async addToFavorites(req, res, next) {
    try {
      const updated = await userService.addToFavorites(req.user.id, req.body.productId);
      res.json(updated);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  // *** удалить с сохранных
  async removeFromFavorites(req, res, next) {
    try {
      const updated = await userService.removeFromFavorites(req.user.id, req.body.productId);
      res.json(updated);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  // *** добавить адрес
  async addAddress(req, res, next) {
    try {
      const user = await userService.addAddress(req.user.id, req.body);
      res.json(user);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  // *** обновить адрес
  async updateAddress(req, res, next) {
    try {
      const { addressId, ...rest } = req.body;
      const updated = await userService.updateAddress(req.user.id, addressId, rest);
      res.json(updated);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  // *** удалить адрес
  async deleteAddress(req, res, next) {
    try {
      const { addressId } = req.body;
      const deleted = await userService.deleteAddress(req.user.id, addressId);
      res.json(deleted);
    } catch (e) {
      res.status(400).json({ message: e });
      next();
    }
  }
  // ***
}
