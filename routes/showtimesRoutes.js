const { Router } = require('express');
const showtimesController = require('../controllers/showtimesController');
const router = Router();

// Endpoint untuk menampilkan semua showtime
router.get('/', showtimesController.getAllShowtimes);

// Endpoint untuk menampilkan showtime berdasarkan showtime_id
router.get('/:showtime_id', showtimesController.getShowtimeById);

// Endpoint membuat showtime baru
router.post('/', showtimesController.createShowtime);

module.exports = router;
