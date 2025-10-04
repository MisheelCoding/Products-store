// src/services/admin/admin.service.js
import bcrypt from 'bcrypt';
import { USER } from '#models/User.js';
import { ORDER } from '#models/Order.js';
import { sanitizePagination } from '#utils/limitPage.js';
import { toClientMaskedUser } from '#utils/mapUser.js';

class AdminService {
  // ---- USERS ----

  async getUsers({ q, role, page = 1, limit = 20, sort = 'createdAt_desc' }) {
    ({ page, limit } = sanitizePagination(page, limit));

    const filter = {};
    if (q) {
      filter.$or = [
        { username: { $regex: q, $options: 'i' } },
        // { email: { $regex: q, $options: 'i' } },
      ];
    }
    if (role) {
      filter.roles = role; // или { $in: [role] } если хочешь гибче
    }

    const sortMap = {
      createdAt_desc: { createdAt: -1 },
      createdAt_asc: { createdAt: 1 },
      username_asc: { username: 1 },
      username_desc: { username: -1 },
    };
    const sortOption = sortMap[sort] || sortMap.createdAt_desc;

    const [items, total] = await Promise.all([
      USER.find(filter)
        .select('-password')
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(limit),
      // .lean(),

      USER.countDocuments(filter),
    ]);

    return {
      // items: items.map((user) => toClientUser(user)),
      items: items.map(toClientMaskedUser),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async postUser({ username, password, roles = ['USER'], email, region, store }) {
    const exists = await USER.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      if (exists.username === username) throw new Error('username уже занят');
      if (exists.email === email) throw new Error('email уже занят');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await USER.create({
      username,
      email,
      password: hash,
      roles,
      region,
      store,
    });

    const plain = user.toObject();
    delete plain.password;
    return plain;
  }

  async updateUser(id, { username, roles, email, region, store, isBanned }) {
    const user = await USER.findById(id);
    if (!user) throw new Error('Пользователь не найден');

    // Защита SUPER_ADMIN
    if (user.roles.includes('SUPER_ADMIN')) {
      throw new Error('Нельзя изменять SUPER_ADMIN');
    }

    const payload = {};
    if (username !== undefined) payload.username = username;
    if (email !== undefined) payload.email = email;
    if (Array.isArray(roles)) payload.roles = roles;
    if (region !== undefined) payload.region = region;
    if (store !== undefined) payload.store = store;
    if (typeof isBanned === 'boolean') payload.isBanned = isBanned;

    const updated = await USER.findByIdAndUpdate(id, payload, { new: true })
      .select('-password')
      .lean();

    if (!updated) throw new Error('Пользователь не найден');
    return updated;
  }

  async deleteUser(id, currentAdminId) {
    const user = await USER.findById(id);
    if (!user) throw new Error('Пользователь не найден');

    if (currentAdminId && String(id) === String(currentAdminId)) {
      throw new Error('Нельзя удалить самого себя');
    }
    if (user.roles.includes('SUPER_ADMIN')) {
      throw new Error('Нельзя удалять SUPER_ADMIN');
    }

    await USER.findByIdAndDelete(id);
    return { ok: true };
  }

  async getOneUser(id) {
    const user = await USER.findById(id).select('-password').lean();
    if (!user) throw new Error('Пользователь не найден');
    return user;
  }

  // ---- ORDERS ----
  async getOrders(currentUser, { page = 1, limit = 20, status, userId } = {}) {
    ({ page, limit } = sanitizePagination(page, limit));

    const filter = {};
    if (status) filter.status = status;
    if (userId) filter.user = userId;

    const isSuper = currentUser.roles?.includes('SUPER_ADMIN');
    if (!isSuper) {
      if (currentUser.store) {
        filter.store = currentUser.store;
      } else if (currentUser.region) {
        filter.region = currentUser.region;
      }
    }

    const [items, total] = await Promise.all([
      ORDER.find(filter)
        .sort({ createdAt: -1 })
        .populate('user', 'username email')
        .populate('courier', 'username')
        .populate('items.product', 'title imageUrl')
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      ORDER.countDocuments(filter),
    ]);

    return { items, total, page, totalPages: Math.ceil(total / limit) };
  }
}

export const adminService = new AdminService();
