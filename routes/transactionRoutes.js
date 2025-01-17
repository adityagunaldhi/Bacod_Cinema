// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Route untuk mengambil detail transaksi berdasarkan booking_id
router.get('/transaction/:bookingId', transactionController.getTransactionDetails);

// Route untuk menyimpan data pembayaran
router.post('/transaction/:bookingId/payment', transactionController.savePayment);

// Route untuk mengambil daftar pembayaran yang menunggu persetujuan
router.get('/transactions/pending', transactionController.getPendingPayments);

module.exports = router;
