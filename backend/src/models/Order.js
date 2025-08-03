import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'delivering', 'completed', 'cancelled'],
      default: 'pending',
    },
    address: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true },
);

export const ORDER = mongoose.model('Order', orderSchema);
