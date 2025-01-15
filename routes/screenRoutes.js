const express = require('express');
const router = express.Router();
const screenController = require('../controllers/screenController');

// Mendapatkan semua screens
router.get('/', screenController.getAllScreens);

// Mendapatkan screen berdasarkan ID
router.get('/:screen_id', screenController.getScreenById);

// Menambahkan screen baru
router.post('/', screenController.createScreen);

// Memperbarui screen 
router.put('/:screen_id', screenController.updateScreen);

// Menghapus screen 
router.delete('/:screenId', screenController.deleteScreen);

module.exports = router;
