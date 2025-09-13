import { ORDER } from '#models/Order.js';
import { USER } from '#models/User.js';
import mapProduct from '#utils/mapProduct.js';
import bcrypt from 'bcrypt';

class UserSerivece {
  // *** Получть текущего
  async getProfile(userId) {
    return await USER.findById(userId).select('-password');
  }
  // *** обновить данные
  async updateProfile(userId, data) {
    return await USER.findByIdAndUpdate(userId, data, { new: true }).select('-password');
  }
  // *** поменять парль
  async changePassword(userId, currentPassword, newPassword) {
    const user = await USER.findById(userId);
    if (!user) throw new Error(`User не найден`);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new Error(`Ошибка неправильный текущий пароль`);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    return true;
  }
  // *** получить все свои закзы старые новые
  async getMyOrders(userId) {
    return await ORDER.find({ user: userId }).populate('items.product');
  }
  // *** получить сохранненные
  async getFavorites(userId, storeKey = 'default') {
    const user = await USER.findById(userId).populate('favorite').lean();

    const mapped = user.favorite.map((p) => mapProduct(p, storeKey));
    return mapped;
  }
  // *** добавить в сохранные
  async addToFavorites(userId, productId) {
    return await USER.findByIdAndUpdate(
      userId,
      { $addToSet: { favorite: productId } },
      { new: true },
    ).populate('favorite');
  }
  // *** удалить с сохранных
  async removeFromFavorites(userId, productId) {
    return await USER.findByIdAndUpdate(
      userId,
      { $pull: { favorite: productId } },
      { new: true },
    ).populate('favorite');
  }
  // *** добавить адрес
  async addAddress(userId, addressData) {
    return await USER.findByIdAndUpdate(
      userId,
      { $push: { addresses: addressData } },
      { new: true },
    );
  }
  // *** обновить адрес
  async updateAddress(userId, addressId, updateData) {
    const user = await USER.findById(userId);
    const address = user.addresses.id(addressId);
    if (!address) throw new Error('Address not found');

    Object.assign(address, updateData);
    await user.save();
    return user;
  }
  // *** удалить адрес
  async deleteAddress(userId, addressId) {
    const user = await USER.findById(userId);
    user.addresses = user.addresses.filter((addr) => addr._id.toString() !== addressId);
    await user.save();
    return user;
  }
  // ***получить адресса
  async getAddresses(userId) {
    const user = await USER.findById(userId).lean();
    if (!user) throw new Error('user not found');
    return user.addresses || [];
  }
}

export const userService = new UserSerivece();
