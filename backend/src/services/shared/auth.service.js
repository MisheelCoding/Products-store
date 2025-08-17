import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { USER } from '#models/User.js';
import { sendMail } from '#utils/mailer.js';
import { genereateToken, saveToken, deleteToken, findToken } from '#utils/token.js';

// *** HELPER for duble code
const mapUser = (user) => ({
  id: user._id,
  username: user.username,
  roles: user.roles,
});

class AuthService {
  // *** login
  async login(username, password) {
    const user = await USER.findOne({ username });
    if (!user) throw new Error(`Пользователь с ${username} таким именем не существет`);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error(`Не верный пароль`);

    const tokens = genereateToken(mapUser(user));
    await saveToken(user._id, tokens.refreshToken);
    return { ...tokens, user: mapUser(user) };
  }
  // *** Register
  async register(username, email, password) {
    const candidate = await USER.findOne({ $or: [{ email }, { username }] });
    if (candidate) {
      if (candidate.email === email) throw new Error(`Email уже используеться`);
      if (candidate.username === username) throw new Error(`username уже используеться`);
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await USER.create({ username, email, password: hash });

    const tokens = genereateToken(mapUser(user));
    await saveToken(user._id, tokens.refreshToken);
    return { ...tokens, user: mapUser(user) };
  }
  // *** refresh token
  async refresh(refreshToken) {
    if (!refreshToken) throw new Error('Нету токена ');

    const data = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const tokenFromDb = await findToken(refreshToken);
    if (!data || !tokenFromDb) throw new Error('Вы не авторизованы');

    const user = await USER.findById(data.id);
    const tokens = genereateToken(mapUser(user));
    await saveToken(user._id, tokens.refreshToken);
    return { ...tokens, user: mapUser(user) };
  }
  // *** logout
  async logout(refreshToken) {
    return await deleteToken(refreshToken);
  }
  async forgotPassword(email) {
    const user = await USER.findOne({ email });

    // единый ответ (не палим существование e-mail)
    const generic = { message: 'Если такой e-mail существует — письмо отправлено' };
    if (!user) return generic;

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_RESET_SECRET, // <-- отдельный секрет
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
    const payload = jwt.verify(token, process.env.JWT_RESET_SECRET); // <-- тот же секрет
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
    const user = await USER.findOne({ email });
    if (!user) throw new Error('user not found');

    const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`; // <-- CLIENT_URL

    await sendMail({
      to: email,
      subject: 'Подтверждение почты',
      html: `<p>Нажмите <a href="${verifyLink}">здесь</a>, чтобы подтвердить</p>`,
    });

    return { message: 'Письмо отправлено повторно' };
  }

  // // *** forget password
  // async forgotPassword(email) {
  //   const user = await USER.findOne({ email });
  //   if (!user) throw new Error(`Пользователь не найден`);

  //   const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  //   const resetLink = `${process.env.DEV_CLIENT_URL}/reset-password?token=${token}`;

  //   await sendMail({
  //     to: email,
  //     subject: 'Resest your password',
  //     html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  //   });

  //   return { message: 'reset email sent' };
  // }
  // async changePassword(token, newPassword) {
  //   const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  //   const user = await USER.findById(payload.id);
  //   if (!user) throw new Error('user not found');

  //   user.password = await bcrypt.hash(newPassword, 10);
  //   await user.save();
  //   return { message: 'Пароль успешно изменен' };
  // }
  // // *** verify email
  // async verifyEmail(token) {
  //   const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  //   const user = await USER.findById(payload.id);
  //   if (!user) throw new Error('user not found');

  //   user.verified = true;
  //   await user.save();
  //   return { message: 'Ваша почта успешно подверждена' };
  // }
  // // ***  resend verify email
  // async resendVerificationCode(email) {
  //   const user = await USER.findOne({ email });
  //   if (!user) throw new Error('user not found');

  //   const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  //   const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  //   await sendMail({
  //     to: email,
  //     subject: 'Подтверждение почты',
  //     html: `<p>Нажмите <a href="${verifyLink}">здесь</a>, чтобы подтвердить</p>`,
  //   });

  //   return { message: 'Письмо отправлено повторно' };
  // }
}

const authServiece = new AuthService();

export { authServiece };
