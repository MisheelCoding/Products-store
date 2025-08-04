import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema(
  {
    label: { type: String, default: 'Мой адресс' },
    addressLine: { type: String, required: true },
    city: { type: String },
    country: { type: String },
    phone: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true },
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ['USER'] },
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    phone: { type: String },
    verified: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    addresses: [addressSchema],
    region: { type: String, required: true },
  },
  { timestamps: true },
);

export const USER = mongoose.model('User', userSchema);
// export { USER };
