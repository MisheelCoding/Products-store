import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: 'tmp/',
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({
  storage,
  limits: { fieldSize: 5 * 1024 * 1024 }, //максимум 5мб
  fileFilter: (_, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error('Разрешены только изображения'));
    }
    cb(null, true);
  },
});
