import express, { application } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js'; // remember to add .js
import hotelsRoute from './routes/hotels.js'; // remember to add .js
import roomsRoute from './routes/rooms.js'; // remember to add .js
import usersRoute from './routes/users.js'; // remember to add .js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const app = express();
const cors = require('cors');
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
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);

// error handling middleware
// takes 4 parameters
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});



app.listen(PORT, () => {
  // call connection to database
  connect();
  console.log(`Server listening on port ${PORT}`);
});