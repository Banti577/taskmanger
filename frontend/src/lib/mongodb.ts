
import mongoose from 'mongoose';

//const MONGODB_URI = process.env.MONGO_URL  jay jay; 
const MONGODB_URI = 'mongodb+srv://patelvn2002:BantiPatel%40000612@cluster0.iqukl.mongodb.net/taskmanager?retryWrites=true&w=majority&appName=Cluster0';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
let cached = global.mongoose;



if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log('MongoDB connection successful');
      return mongoose;
    }).catch((err) => {
      console.error('MongoDB connection error:', err);
      throw err;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

