import jwt from 'jsonwebtoken';

export function checkRole(roles) {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ message: 'Нет авторизаций' });

      const token = authHeader.split(' ')[1];
      if (!token) return res.status(401).json({ message: 'Нет токена' });

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      const userRoles = decoded.roles;

      const hasRole = roles.some((role) => userRoles.includes(role));
      if (!hasRole) return res.status(400).json({ message: 'Нет доступа: недостаточно прав' });

      req.user = decoded;
      next();
    } catch (e) {
      console.error('Ошибка в checkRole:', e.message);
      res.status(400).json({ message: 'ошибка авторизаций' + e.message });
    }
  };
}
