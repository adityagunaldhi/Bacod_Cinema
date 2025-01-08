const bcrypt = require('bcryptjs'); //Call library hashing
const jwt = require('jsonwebtoken'); //Call auth
const knex = require('../config/config');

// Register new user
const register = async (req, res) => {
    const { username, password, email, role = 'costumer' } = req.body;

    // Validasi input
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Username, password, and email are required' });
    }

    try {
        // Cek jika username atau email sudah ada di database
        const existingUser = await knex('users').where('username', username).orWhere('email', email).first();
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user ke database
        const [userId] = await knex('users').insert({ username, password: hashedPassword, email });

        res.status(201).json({ success: true, message: 'User registered successfully', userId });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error registering user', error });
    }
};

// Login user
const login = async (req, res) => {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        // Cari pengguna berdasarkan username
        const user = await knex('users').where({ username }).first();
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Cek apakah password sesuai
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.user_id, username: user.username, role: user.role }, 'your-secret-key', {
            expiresIn: '1h', // Set token expired time
        });

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error logging in', error });
    }
};

module.exports = { register, login };
