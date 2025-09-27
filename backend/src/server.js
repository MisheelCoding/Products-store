import '#config/env.js';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from '#config/DB.js';
import router from '#routes/Router.js';

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: [process.env.DEV_CLIENT_URL, 'http://localhost:5173'],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);
app.all(/.*/, (req, res) => {
  res.json({
    path: req.originalUrl,
    method: req.method,
    message: 'Не существует такого роута',
  });
});

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`server listening http://localhost:${PORT}`));
  } catch (e) {
    console.log(e.message);
  }
};

start();
