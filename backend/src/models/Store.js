import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: { type: String, default: 'Misheel Store' },
  region: { type: String, required: true },
  address: { type: String },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export const STORE = mongoose.model('Store', storeSchema);
