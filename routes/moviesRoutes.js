const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const { checkRole } = require('../middlewares/authMiddleware'); // Middleware untuk role check
const knex = require('../config/config'); // Mengambil data dari database

// Endpoint mencari movies berdasarkan title ( bisa diakses siapapun )
router.get('/search', async (req, res) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).json({ message: 'Title query parameter is required' }); // Tangani jika title tidak diberikan
    }
    try {
        const results = await knex('movies').where('title', 'like', `%${title}%`);
        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error searching movies', error });
    }
});

// Endpoint menampilkan data movies ( bisa diakses siapapun )
router.get('/', moviesController.getMovies);

// Endpoint menambahkan movies baru ( hanya bisa diakses admin )
router.post('/', checkRole('admin'), moviesController.addMovies);

// Endpoint mengupdate movies berdasarkan id ( hanya bisa diakses admin )
router.put('/:id', checkRole('admin'), moviesController.updateMovies);

// Endpoint menghapus movies berdasarkan id ( hanya bisa diakses admin )
router.delete('/:id', moviesController.deleteMovies);

module.exports = router;
