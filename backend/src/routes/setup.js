// // src/routes/setup.routes.js
// import express from 'express';
// import { USER } from '#models/User.js';
// import bcrypt from 'bcrypt';

// const router = express.Router();

// router.post('/super-admin', async (req, res) => {
//   try {
//     const { username, email, password, region } = req.body;
//     if (!username || !email || !password || !region) {
//       return res.status(400).json({ message: 'Все поля обязательны' });
//     }

//     const exists = await USER.findOne({ email });
//     if (exists) {
//       return res.status(400).json({ message: 'Такой пользователь уже существует' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await USER.create({
//       username,
//       email,
//       password: hashedPassword,
//       roles: ['SUPER_ADMIN'],
//       region,
//     });

//     res.status(201).json({ message: 'SUPER_ADMIN создан', user });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

// export default router;
