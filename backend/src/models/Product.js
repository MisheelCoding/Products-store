import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Название товара
    description: { type: String }, // Описание товара
    category: { type: String, required: true }, // Категория товара (например, "овощи", "фрукты", "напитки")
    // Единица измерения: кг, г, шт и т.п.
    unit: {
      type: String,
      required: true,
      enum: ['kg', 'g', 'psc', 'l', 'ml', 'pack'],
    },
    quantityStep: { type: Number, default: 1 }, // Шаг количества для добавления в корзину (например, по 0.5кг)
    imageUrl: { type: String }, // Ссылка на изображение товара
    isAvailable: { type: Boolean, default: true }, // Доступен ли товар для заказа
    weightPerUnit: { type: Number }, // Вес одной единицы товара (для расчёта доставки, например)
    stock: { type: Number, required: true, default: 0 }, // Текущее количество на складе
    // Блок с ценами: текущая цена, старая цена и скидка зависимости от региона от магазина
    price: {
      type: Map,
      of: new mongoose.Schema({
        type: Map,
        of: new mongoose.Schema({
          current: { type: Number, required: true }, // текущая цена
          old: { type: Number }, // старая цена
          discountPercent: { type: Number }, // процент скидки (можно рассчитывать динамически)
        }),
      }),
      required: true,
    },
  },
  { timestamps: true },
); // автоматически добавляет createdAt и updatedAt

export const PRODUCT = mongoose.model('Product', productSchema);
