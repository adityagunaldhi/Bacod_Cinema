const { Router } = require('express');
const router = Router();
const paymentController = require('../controllers/paymentController');


// Endpoint untuk menambahkan pembayaran baru
router.post('/', paymentController.createPayment);

// Endpoint untuk update status pembayaran
router.patch('/:payment_id', paymentController.updatePaymentStatus);

// Endpoint untuk mendapatkan detail pembayaran berdasarkan booking_id
router.get('/booking/:booking_id', paymentController.getPaymentByBooking);

// Endpoint untuk mendapatkan semua pembayaran
// router.get('/', paymentController.getAllPayments);

// Endpoint untuk menyelesaikan pembayaran
router.post('/complete', paymentController.completePayment);

router.get('/', paymentController.getPayments),

// Rute untuk mengecek status pembayaran berdasarkan booking_id
router.get('/payment-status/:bookingId', paymentController.getPaymentStatus);

module.exports = router;
