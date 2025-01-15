const knex = require('../config/config');

// Mendapatkan semua showtimes dengan informasi judul film
const getAllShowtimes = async () => {
    return await knex('showtimes')
        .join('movies', 'showtimes.movie_id', '=', 'movies.movie_id') // Join tabel movies
        .select(
            'showtimes.showtime_id',
            'movies.title as movie_title',
            'movies.poster_image', // Ambil kolom title dari tabel movies
            'showtimes.start_time',
            'showtimes.end_time',
            'showtimes.price'
        )
        .orderBy('showtimes.start_time', 'asc'); // Urutkan berdasarkan waktu mulai
};

// Mendapatkan showtime berdasarkan showtime_id
const getShowtimeById = async (showtime_id) => {
    return await knex('showtimes')
        .leftJoin('movies', 'showtimes.movie_id', '=', 'movies.movie_id', '=', 'movies.poster_image')
        .select(
            'showtimes.showtime_id',
            'movies.*',
            'showtimes.start_time',
            'showtimes.end_time',
            'showtimes.price'
        )
        .where('showtimes.showtime_id', showtime_id)
        .first(); // Mengembalikan hanya satu hasil
};

// Menambahkan showtime baru
const createShowtime = async (movie_id, screen_id, start_time, end_time, price) => {
    return await knex('showtimes').insert({
        movie_id,
        screen_id,
        start_time,
        end_time,
        price
    });
};


module.exports = {
    getAllShowtimes,
    getShowtimeById,
    createShowtime,
};
