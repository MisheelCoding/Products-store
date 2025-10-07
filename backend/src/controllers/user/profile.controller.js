import cloudinary from '#config/cloudinary.js';
import { USER } from '#models/User.js';

import fs from 'fs';

export const uploadProfilePhoto = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await USER.findById(userId);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    if (user.profilePhoto?.public_id) {
      await cloudinary.uploader.destroy(user.profilePhoto.public_id);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: `users/${userId}`,
      access_mode: 'authenticated',
    });

    fs.unlinkSync(req.file.path);

    user.profilePhoto = { public_id: result.public_id };
    await user.save();
    res.json({ message: 'Фото обновлено' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ошибка при загрузке фото' });
  }
};

export const getProfilePhoto = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await USER.findById(userId);
    if (!user || !user.profilePhoto?.public_id) {
      return res.status(404).json({ message: 'Фото не найдено' });
    }

    const expiresAt = Math.floor(Date.now() / 1000) + 30; // 5 минут
    const url = cloudinary.url(user.profilePhoto.public_id, {
      type: 'upload',
      sign_url: true,
      expires_at: expiresAt,
      secure: true, // Добавьте это
      resource_type: 'image',
      // transformation: [{ flags: 'no_cache' }],
    });

    res.json({
      url,
      expiresAt: expiresAt,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Ошибка при получении фото' });
  }
};
