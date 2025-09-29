import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { USER } from '#models/User.js';
import { sendMail } from '#utils/mailer.js';
import { genereateToken, saveToken, deleteToken, findToken } from '#utils/token.js';
import { TOKEN } from '#models/Token.js';
import mongoose from 'mongoose';
import { buildTokenPayload, toClientUser } from '#utils/mapUser.js';
import { hashEmail } from '#utils/hashEmail.js';

// *** HELPER for duble code
//
class AuthService {
  // *** login
  async login(identifier, password) {
    const id = (identifier || '').trim();
    const pwd = password || '';

    const INVALID = new Error('Неверные логин/email или пароль');

    const isEmail = id.includes('@', 0);

    const query = isEmail ? { emailHash: hashEmail(id) } : { username: id };

    const user = await USER.findOne(query);
    if (!user) throw INVALID;

    const ok = await bcrypt.compare(pwd, user.password);
    if (!ok) throw INVALID;

    const tokens = genereateToken(buildTokenPayload(user));
    await saveToken(user._id, tokens.refreshToken);
    return { ...tokens, user: toClientUser(user) };
  }
  // async login(identifier, password) {
  //   const id = (identifier || '').trim();
  //   const pwd = password || '';

  //   // единое сообщение — не палим, существует ли пользователь
  //   const INVALID = new Error('Неверные логин/email или пароль');

  //   if (!id || !pwd) throw INVALID;

  //   const isMail = id.includes('@', 0);

  //   // если поля в БД хранятся как есть (не в lower), используем collation для case-insensitive поиска
  //   // strength:2 — без учёта регистра
  //   const query = isMail
  //     ? { email: id } // будет сравниваться без учёта регистра благодаря collation
  //     : { username: id };

  //   const user = await USER.findOne(query).collation({ locale: 'en', strength: 2 });

  //   if (!user) throw INVALID;

  //   const ok = await bcrypt.compare(pwd, user.password);
  //   if (!ok) throw INVALID;

  //   const tokens = genereateToken(buildTokenPayload(user));
  //   await saveToken(user._id, tokens.refreshToken);

  //   return { ...tokens, user: toClientUser(user) };
  // }
  // *** Register
  async register(username, email, password) {
    const emailHash = hashEmail(email);
    const candidate = await USER.findOne({ $or: [{ emailHash }, { username }] });
    if (candidate) {
      if (candidate.emailHash === emailHash) throw new Error(`Email уже используеться`);
      if (candidate.username === username) throw new Error(`username уже используеться`);
    }
    const hash = await bcrypt.hash(password, 10);
    console.log('data', { email, username, password });
    const user = await USER.create({
      username,
      email,
      password: hash,
      emailHash: emailHash,
    });
    // user.emailHash = hashEmail(user.email);
    const tokens = genereateToken(buildTokenPayload(user));
    await saveToken(user._id, tokens.refreshToken);
    return { ...tokens, user: toClientUser(user) };
  }
  // *** refresh token
  async refresh(refreshToken) {
    if (!refreshToken) throw new Error('Нету токена');

    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch {
      throw new Error('Вы не авторизованы');
    }

    // проверяем, есть ли запись для пользователя
    const tokenDoc = await TOKEN.findOne({ user: payload.id });
    if (!tokenDoc) throw new Error('Вы не авторизованы');

    // тут убираем строгую проверку на равенство
    // достаточно того, что refresh валидный и юзер есть

    const user = await USER.findById(payload.id);
    if (!user) throw new Error('Пользователь не найден');

    // генерируем новые токены (и новый refresh!)
    const tokens = genereateToken(buildTokenPayload(user));

    // сохраняем новый refresh в базу
    await saveToken(user._id, tokens.refreshToken);

    return { ...tokens, user: toClientUser(user) };
  }
  // *** logout
  async logout(refreshToken) {
    return await deleteToken(refreshToken);
  }
  // *** forget pass

  async forgotPassword(email) {
    const user = await USER.findOne({ email });

    // единый ответ (не палим существование e-mail)
    const generic = { message: 'Если такой e-mail существует - письмо отправлено' };
    if (!user) return generic;

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_RESET_SECRET, // env
      { expiresIn: '15m' },
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    await sendMail({
      to: email,
      subject: 'Reset your password',
      html: `<p>Нажмите <a href="${resetLink}">сюда</a>, чтобы сбросить пароль. Ссылка действует 15 минут.</p>`,
    });

    return generic;
  }

  async changePassword(token, newPassword) {
    const payload = jwt.verify(token, process.env.JWT_RESET_SECRET); // тот же секрет
    const user = await USER.findById(payload.id);
    if (!user) throw new Error('user not found');

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return { message: 'Пароль успешно изменён' };
  }

  // *** verify email
  async verifyEmail(token) {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    const user = await USER.findById(payload.id);
    if (!user) throw new Error('user not found');

    user.verified = true;
    await user.save();
    return { message: 'Ваша почта успешно подтверждена' };
  }

  // *** resend verify email (единный CLIENT_URL)
  async resendVerificationCode(email) {
    const user = await USER.findOne({ emailHash: hashEmail(email) });
    if (!user) throw new Error('user not found');
    if (user.verified) throw new Error('почта уже подверждена');

    const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const verifyLink = `${process.env.DEV_CLIENT_URL}/auth/verify-email?token=${token}`;

    await sendMail({
      to: user.email,
      subject: 'Подтверждение почты на сайте Misheel Store',
      html: `<p>Нажмите <a href="${verifyLink}">здесь</a>, чтобы подтвердить ваш Email на сайте${process.env.MAIL_FROM_NAME}</p>`,
    });

    return { message: 'Письмо отправлено повторно' };
  }
}

const authServiece = new AuthService();

export { authServiece };
