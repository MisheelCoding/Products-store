// src/services/admin/admin.service.js
import bcrypt from 'bcrypt';
import { USER } from '#models/User.js';
import { ORDER } from '#models/Order.js';
import { sanitizePagination } from '#utils/limitPage.js';
import { toClientMaskedUser, toClientUser } from '#utils/mapUser.js';

class AdminService {
  // ---- USERS ----

  async getUsers({ q, role, page = 1, limit = 20, sort = 'createdAt_desc' }, currentUser) {
    ({ page, limit } = sanitizePagination(page, limit));

    const isSuperAdmin = currentUser.roles.includes('SUPER_ADMIN');

    const filter = {};
    if (q) {
      if (isSuperAdmin) {
        filter.$or = [
          { username: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } },
        ];
      } else {
        filter.$or = [{ username: { $regex: q, $options: 'i' } }];
      }
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
        .collation({ locale: 'en', strength: 1 })
        .skip((page - 1) * limit)
        .limit(limit),
      // .lean(),

      USER.countDocuments(filter),
    ]);

    return {
      // items: items.map((user) => toClientUser(user)),
      items: items.map(isSuperAdmin ? toClientUser : toClientMaskedUser),
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

  async updateUser(ids, data, currentAdminId) {
    const idArray = Array.isArray(ids) ? ids : [ids];
    const users = await USER.find({ _id: { $in: idArray } });
    if (!users) throw new Error('Пользователи не найдены');

    const updatedUsers = [];
    for (const user of users) {
      if (user.roles.includes('SUPER_ADMIN')) {
        continue;
        // throw new Error('Нельзя изменять SUPER_ADMIN');
      }
      if (user._id.toString() === currentAdminId) {
        continue;
        // throw new Error('Нельзя Свои данные обновить');
      }

      const payload = {};
      if (data.username !== undefined) payload.username = data.username;
      if (data.email !== undefined) payload.email = data.email;
      if (Array.isArray(data.roles)) payload.roles = data.roles;
      if (data.region !== undefined) payload.region = data.region;
      if (data.store !== undefined) payload.store = data.store;
      if (typeof data.isBanned === 'boolean') payload.isBanned = data.isBanned;

      const updated = await USER.findByIdAndUpdate(user._id, payload, { new: true })
        .select('-password')
        .lean();

      if (!updated) throw new Error('Пользователь не найден');
      if (updated) updatedUsers.push(updated);
    }
    return updatedUsers;
    // Защита SUPER_ADMIN
  }

  async deleteUser(ids, currentAdminId) {
    const idList = Array.isArray(ids) ? ids : [ids];

    for (const id of idList) {
      if (currentAdminId && String(id) === String(currentAdminId)) {
        throw Error('Нельзя удалить самого себя');
      }

      const user = await USER.findById(id);
      if (!user) throw new Error('Пользователь не найден');
      if (user.roles.includes('SUPER_ADMIN')) {
        throw new Error(`Нельзя удалять SUPER_ADMIN (id=${id})`);
      }
    }

    await USER.deleteMany({ _id: { $in: idList } });

    return { ok: true, deleted: idList.length };
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
