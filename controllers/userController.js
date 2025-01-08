const knex = require('../config/config'); 

//Mengambil data user berdasarkan user_id
const getUserById = async (req, res) => {
    try {
        const user = await knex('users').where({ user_id: req.params.user_id }).first();
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching user data', error });
    }
};

module.exports = { getUserById };
