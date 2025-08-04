import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer '))
      return res.status(401).json({ message: 'Нет авторизаций (Bearer)' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Нет токена ' });

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!decoded?.id) return res.status(401).json({ message: 'Недопустимый токен' });

    req.user = decoded;
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(401).json({ message: 'Ошибка авторизаций' });
  }
};
