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
        .leftJoin('movies', 'showtimes.movie_id', '=', 'movies.movie_id')
        .select(
            'showtimes.showtime_id',
            'movies.title as movie_title',
            'movies.poster_image',
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

// Get the number of available seats for a showtime
const getAvailableSeats = async (showtime_id) => {
    try {
        const seats = await knex('seats')
            .leftJoin('booking_details', 'seats.seat_id', '=', 'booking_details.seat_id')
            .leftJoin('bookings', 'bookings.booking_id', '=', 'booking_details.booking_id')
            .where('bookings.showtime_id', showtime_id)
            .andWhere('seats.is_booked', false)
            .count('seats.seat_id as available_seats');

        return seats[0].available_seats || 0;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllShowtimes,
    getShowtimeById,
    createShowtime,
    getAvailableSeats
};
