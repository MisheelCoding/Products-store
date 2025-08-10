// middlewares/auth/checkRole.js
export function checkRole(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user; // установлен в authMiddleware
    if (!user) return res.status(401).json({ message: 'Не авторизован' });

    // SUPER_ADMIN видит всё
    if (user.roles?.includes('SUPER_ADMIN')) return next();

    // если роли не передали — достаточно быть авторизованным
    if (allowedRoles.length === 0) return next();

    const has = allowedRoles.some((r) => user.roles?.includes(r));
    if (!has) return res.status(403).json({ message: 'Доступ запрещён' });

    next();
  };
}
