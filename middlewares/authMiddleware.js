const jwt = require('jsonwebtoken');

// Middleware untuk memverifikasi token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Invalid or missing Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const secretKey = 'your-secret-key';

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            }
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded; // Tambahkan data user ke req
        next();
    });
};

// Middleware untuk memeriksa role pengguna
const checkRole = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Ambil token dari header
        if (!token) return res.status(403).json({ message: 'No token provided' });

        jwt.verify(token, 'your-secret-key', (err, decoded) => {
            if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

            // Periksa apakah role pengguna sesuai dengan role yang diperlukan
            if (decoded.role !== requiredRole) {
                return res.status(403).json({ message: 'Access forbidden: insufficient privileges' });
            }

            req.user = decoded; // Tambahkan data user ke req
            next();
        });
    };
};

module.exports = { verifyToken, checkRole };
