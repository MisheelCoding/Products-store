export const refreshTokenCookieOptions = {
  httpOnly: true,
  secure: false,
  sakeSite: 'Lax',
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export const setRefreshTokenCookie = (res, token) => {
  res.cookie('refreshToken', token, refreshTokenCookieOptions);
};
