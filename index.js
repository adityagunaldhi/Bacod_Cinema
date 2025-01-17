const express = require('express');
const cors = require('cors');
const app = express();


// Import Routes
const moviesRoutes = require('./routes/moviesRoutes');
const cinemaRoutes = require('./routes/cinemaRoutes');
const seatRoutes = require('./routes/seatRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const showtimesRoutes = require('./routes/showtimesRoutes');
const bookingDetailsRoutes = require('./routes/bookingDetailsRoutes');
const screenRoutes = require('./routes/screenRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const detailBookingRoutes = require('./routes/detailBookingRoutes');
const approvalRoutes = require('./routes/approvalRoutes');

const path = require('path');

// Akses lintas domain
// Parsing data JSON
app.use(cors());
app.use(express.json());

// Setup routes
app.use('/api/movies', moviesRoutes);
app.use('/api/cinemas', cinemaRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/showtimes', showtimesRoutes);
app.use('/api/bookings-details', bookingDetailsRoutes);
app.use('/api', transactionRoutes);
app.use('/api', detailBookingRoutes);
app.use('/api', approvalRoutes);
app.use('/api/screens', screenRoutes);
app.use(express.static(path.join(__dirname,'public')));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

// Dijalankan pada port 5000
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
