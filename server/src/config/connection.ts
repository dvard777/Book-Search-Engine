// server/src/config/connection.ts
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourDBName', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.on('error', (err) => console.error(`MongoDB connection error: ${err}`));
export default connection;
