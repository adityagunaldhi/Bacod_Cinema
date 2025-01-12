const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');

// Endpoint mengambil data seats berdasarkan screen_id
router.get('/', seatController.getSeats);

// Endpoint menambahkan seats baru
router.post('/', seatController.addSeat);

// Endpoint update seat berdasarkan seat_id
router.put('/:seat_id', seatController.updateSeatStatus);

module.exports = router;
