import { ORDER } from '#models/Order.js';
import { USER } from '#models/User.js';
import { text } from 'express';

class AdminService {
  async getUsers(query) {
    const filtered = {};

    const limit = parseInt(query.limit) || 5;
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;

    const users = await USER.find(filtered).skip(skip).limit(limit).lean();
    const total = await USER.countDocuments(filtered);

    return {
      users,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
  async postUser({ username, password, roles }) {}
  async updateUser() {}
  async deleteUser() {}
  async getOrders(currentUser) {
    if (currentUser.roles.includes('SUPERADMIN')) return await ORDER.find();
    else if (currentUser.roles.includes('ADMIN'))
      return await ORDER.find({ region: currentUser.region });
    else {
      throw new Error('Нет доступа');
    }
  }
  // async getUsers() {}
}

export const adminService = new AdminService();
