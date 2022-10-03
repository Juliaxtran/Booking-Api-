import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express();
const PORT = 3002;
dotenv.config();



// connect to database

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('connected to mongoDB');
  } catch (error) {
    throw error; // Crash the app if we can't connect to the database
  }
};

app.listen(PORT, () => {
  // call connection to database
  connect();
  console.log(`Server listening on port ${PORT}`);
});