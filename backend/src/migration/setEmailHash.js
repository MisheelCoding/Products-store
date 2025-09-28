import 'dotenv/config'; // подгружаем env первым делом
import { USER } from '#models/User.js';
import { hashEmail } from '#utils/hashEmail.js';
import connectDB from '#config/DB.js';

async function migrate() {
  await connectDB();

  console.log('🔄 Начинаем миграцию...');

  const users = await USER.find({
    $or: [{ emailHash: { $exists: false } }, { emailHash: null }],
  });

  console.log(`Найдено ${users.length} пользователей без emailHash`);

  for (const user of users) {
    if (user.email) {
      user.emailHash = hashEmail(user.email);
      await user.save();
      console.log(`✅ Обновлен: ${user.email}`);
    }
  }

  console.log('🎉 Миграция завершена!');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('❌ Ошибка миграции:', err);
  process.exit(1);
});
