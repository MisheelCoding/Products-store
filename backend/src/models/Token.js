import mongoose from 'mongoose';

// const Token
const tokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export const TOKEN = mongoose.model('Token', tokenSchema);
