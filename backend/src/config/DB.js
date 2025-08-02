import mongoose from 'mongoose';
export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected MOngo DB');
  } catch (e) {
    console.log('error message');
    console.log(e.message);
  }
}
