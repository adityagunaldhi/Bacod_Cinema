const { Router } = require('express'); // Impor router dari modul express
const userController = require('../controllers/userController'); // Impor controller 
const { verifyToken } = require('../middlewares/authMiddleware'); // Impor verifytoken dari authMiddleware

const router = Router();

/**
 * GET /:user_id
 * Rute ini mengambil data pengguna berdasarkan user_id.
 * - Middleware `verifyToken`: Memverifikasi token otentikasi.
 * - Controller `getUserById`: Mengambil data pengguna dari database.
 */
router.get('/:user_id', verifyToken, userController.getUserById);

//ekspor router
module.exports = router;
