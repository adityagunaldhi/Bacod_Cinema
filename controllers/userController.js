const knex = require('../config/config'); 

// Mengambil data user berdasarkan user_id
const getUserById = async (req, res) => {
    const { user_id } = req.params;

    // Memastikan user_id adalah angka
    if (!user_id || isNaN(user_id)) {
        return res.status(400).json({ success: false, message: 'Invalid user_id' });
    }

    try {
        const user = await knex('users').where('user_id', user_id).first();

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user });
    } catch (error) {
        console.error(error);  // Menambahkan log error untuk debugging
        res.status(500).json({ success: false, message: 'Error fetching user data', error });
    }
};

module.exports = { getUserById };