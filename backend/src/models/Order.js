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
    courier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //Курьер
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'delivering', 'completed', 'cancelled'],
      default: 'pending',
    },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    region: { type: String, required: true },

    deliviryWindow: {
      from: { type: Date, default: null },
      to: { type: Date, default: null },
    },
    message: { type: String, default: '' }, //для коммента пользовтеля
  },
  { timestamps: true },
);

export const ORDER = mongoose.model('Order', orderSchema);
