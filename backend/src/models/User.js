import mongoose from 'mongoose';

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

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: { type: [String], default: ['USER'] }, //COURIER , ADMIN, SUPERADMIN
    favorite: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    phone: { type: String, default: '' },
    verified: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    addresses: [addressSchema],
    region: { type: String },
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },
    savedCards: [savedCardSchema],
  },
  { timestamps: true },
);

export const USER = mongoose.model('User', userSchema);

// export { USER };
