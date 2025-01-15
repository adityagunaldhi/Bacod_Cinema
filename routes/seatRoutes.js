const express = require('express');
const seatController = require('../controllers/seatController');

const router = express.Router();

// Endpoint untuk mendapatkan semua kursi berdasarkan screen_id
router.get('/screen/:screen_id', seatController.getSeatsByScreen);

// Endpoint untuk menambah kursi baru
router.post('/', seatController.addSeat);

// Endpoint untuk memperbarui status kursi
router.put('/:seat_id/status', seatController.updateSeatStatus);

// Endpoint untuk mengecek kursi yang tersedia berdasarkan screen_id
router.get('/available/:screen_id', seatController.checkAvailableSeats);

// Endpoint untuk mendapatkan semua kursi berdasarkan showtime_id
router.get('/showtime/:showtime_id', seatController.getSeatsByShowtime);



module.exports = router;
