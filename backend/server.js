const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transaction');

const app = express();
const port = process.env.REACT_APP_BACKEND_PORT || 6001;
dotenv.config();
const frontendUrl = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3001';
const mongoUrl = process.env.REACT_APP_DB_URL || 'mongodb://localhost:27017/letspayalex';
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:6001';

console.log('Url for mongo connection: ', mongoUrl);
console.log('Url for frontend: ', frontendUrl);
console.log('Url for backend: ', backendUrl);

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(
  cors({
    allowedOrigins: [frontendUrl],
  }),
);
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/transaction', transactionRoutes);
app.listen(port, () => console.log(`Server listening on port ${port}`));
