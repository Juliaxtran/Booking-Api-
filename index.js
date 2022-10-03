import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'; // remember to add .js

const app = express();
const PORT = 3002;
dotenv.config();



// connect to database

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to mongoDB');
  } catch (error) {
    throw error; // Crash the app if we can't connect to the database
  }
};

// mongo conencted if its disconencted then it will reconnect
mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from mongoDB');
});

mongoose.connection.on('connected', () => {
  console.log('mongoDB connected');
})

app.get('/', (req, res) => {
  res.send('Hello World!');
  });


// Create middleware for routes
app.use('/auth', authRoute);

app.listen(PORT, () => {
  // call connection to database
  connect();
  console.log(`Server listening on port ${PORT}`);
});