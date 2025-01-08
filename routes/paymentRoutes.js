const { Router } = require('express');
const router = Router();
const paymentController = require('../controllers/paymentController');


// Endpoint untuk menambahkan pembayaran baru
router.post('/', paymentController.createPayment);

// Endpoint untuk update status pembayaran
router.patch('/:payment_id', paymentController.updatePaymentStatus);

// Endpoint untuk mendapatkan detail pembayaran berdasarkan booking_id
router.get('/booking/:booking_id', paymentController.getPaymentByBooking);

module.exports = router;
