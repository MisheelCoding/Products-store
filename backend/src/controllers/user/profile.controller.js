import { USER } from '#models/User.js';
import { s3 } from '#config/s3.js';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import fs from 'fs';
import path from 'path';

export const uploadProfilePhoto = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await USER.findById(userId);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

    if (user.profilePhoto?.public_id) {
      console.log('Удаляем старое фото:', user.profilePhoto.public_id);
      try {
        const deleteRes = await s3.send(
          new DeleteObjectCommand({
            Bucket: process.env.YANDEX_BUCKET,
            Key: user.profilePhoto.public_id,
          }),
        );
        console.log('Delete response:', deleteRes);
      } catch (e) {
        console.warn('Не удалось удалить старое фото:', e.message);
      }
    }

    const fileName = `users/${userId}/${Date.now()}${path.extname(req.file.originalname)}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.YANDEX_BUCKET,
        Key: fileName,
        Body: fs.readFileSync(req.file.path),
        ContentType: req.file.mimetype,
        ACL: 'private',
      }),
    );

    fs.unlinkSync(req.file.path);

    user.profilePhoto = { public_id: fileName };
    await user.save();
    res.json({ message: 'Фото обновлено', key: fileName });
  } catch (e) {
    console.error('Upload error:', e);
    res.status(500).json({ message: 'Ошибка при загрузке фото', error: e.message });
  }
};

export const getProfilePhoto = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await USER.findById(userId);
    if (!user || !user.profilePhoto?.public_id) {
      return res.status(404).json({ message: 'Фото не найдено' });
    }

    // Срок действия ссылки: час секунд когда чат тогда поставитт 3-5мин
    const expiresIn = 3600; // час
    const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;

    // Генерируем подпись
    const command = new GetObjectCommand({
      Bucket: process.env.YANDEX_BUCKET,
      Key: user.profilePhoto.public_id,
    });

    // Формируем URL
    const url = await getSignedUrl(s3, command, { expiresIn: expiresIn });

    res.json({ url, expiresAt: expiresAt });
  } catch (e) {
    console.error('Error in getProfilePhoto:', e);
    res.status(500).json({ message: 'Ошибка при получении фото' });
  }
};

// export const getProfilePhoto = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const user = await USER.findById(userId);
//     if (!user || !user.profilePhoto?.public_id) {
//       return res.status(404).json({ message: 'Фото не найдено' });
//     }

//     // Ставим URL сроком на 30 секунд
//     const expiresAt = Math.floor(Date.now() / 1000) + 30;

//     const url = cloudinary.url(user.profilePhoto.public_id, {
//       type: 'authenticated',
//       sign_url: true,
//       expires_at: expiresAt,
//     });

//     res.json({ url, expiresAt });
//   } catch (e) {
//     console.error('Error in getProfilePhoto:', e);
//     res.status(500).json({ message: 'Ошибка при получении фото' });
//   }
// };
