
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


const userRoutes = require('./routes/userRoutes');
const rfidRoutes = require('./routes/rfidRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes');
connectDB();

const app = express();


app.use(express.json());
app.use(cors());
app.use(cors({
  origin: 'http://localhost:3001'
}));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/rfid', rfidRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/payment', paymentRoutes);
app.get('/', (req, res) => {
  res.send('Thali Backend is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
