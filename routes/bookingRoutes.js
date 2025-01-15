const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Endpoint booking berdasarkan user_id
router.get('/:user_id', bookingController.getBookings);

// Endpoint untuk menambah booking baru
router.post('/', bookingController.addBooking);

// Endpoint update status booking
router.put('/:booking_id', bookingController.updateBookingStatus);

<<<<<<< HEAD
router.post('/book-seat', bookingController.createBooking);



=======
>>>>>>> e17d88859702b66943a44fa4c29bf852766dfdc1
module.exports = router;
