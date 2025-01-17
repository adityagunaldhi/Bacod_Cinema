const express = require('express');
const router = express.Router();
const approvalController = require('../controllers/approvalController');

// router.get('/approval', approvalController.getPayments); // Mendapatkan semua pembayaran
// router.patch('/payments/:payment_id', approvalController.updatePaymentStatus); // Memperbarui status pembayaran

module.exports = router;
