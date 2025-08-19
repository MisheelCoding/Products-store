import jwt from 'jsonwebtoken';
import { TOKEN } from '#models/Token.js';
// *** GENERATE token func
export const genereateToken = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '10s' }); //15m
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
  return { accessToken, refreshToken };
};

// *** SAVE token func and update

export const saveToken = async (userId, refreshToken) => {
  const existing = await TOKEN.findOne({ user: userId });
  if (existing) {
    existing.refreshToken = refreshToken;
    return await existing.save();
  }
  return await TOKEN.create({ user: userId, refreshToken });
};

// *** DELETE token func
export const deleteToken = async (refreshToken) => await TOKEN.deleteOne({ refreshToken });

// *** FIND token func
export const findToken = async (refreshToken) => await TOKEN.findOne({ refreshToken });

// *** find by user
export const findTokenByUser = async (userId) => TOKEN.findOne({ user: userId });
