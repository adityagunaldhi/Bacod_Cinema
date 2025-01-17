// routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

// Endpoint untuk mengambil data invoice berdasarkan booking_id
router.get('/invoice/:booking_id', invoiceController.getInvoice);

module.exports = router;
