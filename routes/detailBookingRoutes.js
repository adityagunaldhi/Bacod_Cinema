// routes/bookingDetailsRoutes.js
const express = require('express');
const router = express.Router();
const { addBookingDetail } = require('../controllers/detailBookingController');

// Route untuk menambahkan booking detail ke dalam database
router.post('/add-booking-detail', addBookingDetail);

module.exports = router;
