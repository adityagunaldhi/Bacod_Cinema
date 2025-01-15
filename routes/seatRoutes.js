const express = require('express');
<<<<<<< HEAD
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

=======
const router = express.Router();
const seatController = require('../controllers/seatController');

// Endpoint mengambil data seats berdasarkan screen_id
router.get('/', seatController.getSeats);

// Endpoint menambahkan seats baru
router.post('/', seatController.addSeat);

// Endpoint update seat berdasarkan seat_id
router.put('/:seat_id', seatController.updateSeatStatus);
>>>>>>> e17d88859702b66943a44fa4c29bf852766dfdc1

module.exports = router;
