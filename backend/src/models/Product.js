import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  decstiption: { type: String },
  category: { type: String, required: true },
  unit: { type: String, required: true, enum: ['kg', 'g', 'psc', 'l', 'ml', 'pack'] },
  quantityStep: { type: Number, default: 1 },
  imageUrl: { type: String },
  isAvailable: { type: Boolean, default: true },
  weithPerUnit: { type: Number },
  stock: { type: Number, required: true, default: 0 },
});

export const PRODUCT = mongoose.model('Product', productSchema);
