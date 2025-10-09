import { hashEmail } from '#utils/hashEmail.js';
import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';

const savedCardSchema = new mongoose.Schema({
  paymentMethodId: { type: String, required: true }, // id от ЮKassa
  type: { type: String }, // тип карты: Visa, MasterCard, Мир
  last4: { type: String }, // последние 4 цифры
  expMonth: { type: String },
  expYear: { type: String },
  title: { type: String }, // "Bank card *4444"
  createdAt: { type: Date, default: Date.now },
  isDefault: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'deleted'], default: 'active' },
});

const addressSchema = new mongoose.Schema(
  {
    label: { type: String, default: 'Мой адресс' },
    addressLine: { type: String, required: true, index: true },
    city: { type: String },
    country: { type: String },
    phone: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { _id: true },
);

addressSchema.plugin(encrypt, {
  encryptionKey: process.env.ENCRYPTION_KEY,
  signingKey: process.env.SIGNING_KEY,
  encryptedFields: ['phone', 'addressLine'],
  // decryptPostSave: false, // Ключевая опция - не расшифровывать автоматически
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, required: true }, // unique: false
    emailHash: { type: String, unique: true, index: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ['USER'] }, //COURIER , ADMIN, SUPERADMIN потом можно добавить MANAGER расшиорить
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    phone: { type: String, default: null },
    verified: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    addresses: [addressSchema],
    region: { type: String, default: null },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    savedCards: [savedCardSchema],
    profilePhoto: {
      public_id: { type: String, default: null }, // надо поменять public_id на key чтобы работать корректно S3 c TS В бдудушем
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('email')) {
    this.emailHash = hashEmail(this.email);
  }
  next();
});

userSchema.plugin(encrypt, {
  encryptionKey: process.env.ENCRYPTION_KEY,
  signingKey: process.env.SIGNING_KEY,
  encryptedFields: ['phone', 'email'],
  // encryptedFields: ['phone'],
  // decryptPostSave: false, // Ключевая опция - не расшифровывать автоматически
});

userSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'user',
});

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });

export const USER = mongoose.model('User', userSchema);
