// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const { getTransactionDetails } = require('../controllers/transactionController');

// Route untuk mengambil detail transaksi berdasarkan booking_id
router.get('/transaction/:bookingId', getTransactionDetails);

module.exports = router;
