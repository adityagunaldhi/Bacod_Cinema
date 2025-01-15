const express = require('express');
const router = express.Router();
const cinemaController = require('../controllers/cinemaController');

// Endpoint menampilkan semua data cinema
router.get('/', cinemaController.getCinemas);

// Endpoint menambahkan cinema baru
router.post('/', cinemaController.addCinema);

// Endpoint update cinema berdasarkan id
router.put('/:id', cinemaController.updateCinema);

// Endpoint hapus cinema berdasarkan id
router.delete('/:id', cinemaController.deleteCinema);

module.exports = router;
