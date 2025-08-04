import { authServiece } from '#services/shared/auth.service.js';
import { setRefreshTokenCookie } from '#utils/cookie.js';

class AuthController {
  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const data = await authServiece.login(username, password);

      setRefreshTokenCookie(res, data.refreshToken);
      res.json({ accessToken: data.accessToken, user: data.user });
    } catch (e) {
      res.status(400).json({ message: `Ошибка - ${e.message}` });
    }
  }
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const data = await authServiece.register(username, email, password);
      setRefreshTokenCookie(res, data.refreshToken);
      res.json({ accessToken: data.accessToken, user: data.user });
    } catch (e) {
      next(e);
    }
  }
  async refreshToken(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const data = await authServiece.refresh(refreshToken);

      setRefreshTokenCookie(res, data.refreshToken);
      res.json({ accessToken: data.accessToken, user: data.user });
    } catch (e) {}
  }
  async logout(req, res, next) {
    try {
      await authServiece.logout(req.query.refreshtoken);
      res.json({ message: 'Вы успешно вышли с аккаунта ' });
    } catch (e) {
      next(e);
    }
  }
  async forgotPassword(req, res, next) {
    try {
      const data = await authServiece.forgotPassword(req.body.email);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async changePassword(req, res, next) {
    try {
      const { refreshtoken } = req.query;
      const { newPassword } = req.body;
      const data = await authServiece.changePassword(refreshtoken, newPassword);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async verifyEmail(req, res, next) {
    try {
      const data = await authServiece.verifyEmail(req.query.refreshtoken);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
  async resendVerificationCode(req, res, next) {
    try {
      const data = await authServiece.resendVerificationCode(req.body.email);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
}

const authController = new AuthController();

export { authController };
