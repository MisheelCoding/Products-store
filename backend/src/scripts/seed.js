// backend/src/scripts/seed.test.js
import mongoose from 'mongoose';
import 'dotenv/config';
import bcrypt from 'bcrypt';
import { USER } from '../models/User.js';
import { ORDER } from '../models/Order.js';
import { PRODUCT } from '../models/Product.js';

(async () => {
  try {
    console.log('⏳ Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL);

    // 1. Курьер
    let courier = await USER.findOne({ username: 'courier1' });
    if (!courier) {
      const hash = await bcrypt.hash('courierpass', 10);
      courier = await USER.create({
        username: 'courier1',
        email: 'courier@example.com',
        password: hash,
        roles: ['COURIER'],
        region: 'krasnodar',
        store: '6897bef92b8d547b39241855', // ID твоего магазина
      });
      console.log('🚚 Курьер создан:', courier.username);
    } else {
      console.log('ℹ️ Курьер уже есть');
    }

    // 2. Обычный пользователь
    let customer = await USER.findOne({ username: 'customer1' });
    if (!customer) {
      const hash = await bcrypt.hash('userpass', 10);
      customer = await USER.create({
        username: 'customer1',
        email: 'customer@example.com',
        password: hash,
        roles: ['USER'],
        region: 'krasnodar',
      });
      console.log('👤 Пользователь создан:', customer.username);
    } else {
      console.log('ℹ️ Пользователь уже есть');
    }

    // 3) Берём любой продукт
    const product = await PRODUCT.findOne();
    if (!product) throw new Error('❌ Нет продукта в базе — создай продукт перед запуском');

    // 4) Подготовим позиции заказа
    const items = [
      {
        product: product._id,
        quantity: 2,
        // Можно взять цену из продукта, если есть, иначе — зафиксировать вручную:
        price: 150,
      },
    ];

    // 5) Посчитаем totalAmount
    const totalAmount = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

    // 6) Создаём заказ (добавили address и phone)
    const order = await ORDER.create({
      user: customer._id,
      store: '6897bef92b8d547b39241855', // твой магазин
      region: 'krasnodar',
      status: 'pending',
      items,
      totalAmount, // <-- ОБЯЗАТЕЛЬНО
      address: 'г. Краснодар, ул. Красная, 123, кв. 1', // <-- ОБЯЗАТЕЛЬНО
      phone: '+7 900 000-00-00', // <-- ОБЯЗАТЕЛЬНО
    });
    console.log('🛒 Заказ создан:', order._id);

    console.log('✅ Тестовые данные загружены');
    process.exit(0);
  } catch (err) {
    console.error('❌ Ошибка seed:', err);
    process.exit(1);
  }
})();
