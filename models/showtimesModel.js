const knex = require('../config/config');

//Mengambil semua data showtime
const getAllShowtimes = async () => {
    return await knex('showtimes');
};

//Mengambil data showtime berdasarkan showtime_id
const getShowtimeById = async (showtime_id) => {
    return await knex('showtimes').where({ showtime_id }).first();
};

//Membuat showtime baru
const createShowtime = async (movie_id, screen_id, start_time, end_time, price) => {
    return await knex('showtimes').insert({
        movie_id,
        screen_id,
        start_time,
        end_time,
        price,
    });
};

module.exports = {
    getAllShowtimes,
    getShowtimeById,
    createShowtime,
};
