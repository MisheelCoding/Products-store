// src/utils/cookie.js
const common = { httpOnly: true, secure: false, sameSite: 'Lax', path: '/' };

export const setRefreshTokenCookie = (res, token) => {
  res.cookie('refreshToken', token, { ...common, maxAge: 30 * 24 * 3600 * 1000 }); // 30 дней
};

export const clearAuthCookies = (res) => {
  res.clearCookie('refreshToken', common);
};
