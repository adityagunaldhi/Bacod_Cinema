const { Router } = require('express');
const bookingsDetailsController = require('../controllers/bookingsDetailsController');
const router = Router();

// Endpoint booking-detail berdasarkan booking id
router.get('/:booking_id', bookingsDetailsController.getBookingDetailsByBookingId);

// Endpoint membuat booking-detail
router.post('/', bookingsDetailsController.createBookingDetail);

module.exports = router;
