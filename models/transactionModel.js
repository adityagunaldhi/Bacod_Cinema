// models/Booking.js
const knex = require('../config/config');

const Booking = {
  getById: async (bookingId) => {
    return await knex('booking')
    .leftJoin('showtimes', 'booking.showtime_id', 'showtimes.showtime_id')  // Join dengan showtimes berdasarkan showtime_id
    .leftJoin('movies', 'showtimes.movie_id', 'movies.movie_id')  // Join dengan movies berdasarkan movie_id
    .leftJoin('screens', 'showtimes.screen_id', 'screens.screen_id')  // Join dengan screens berdasarkan screen_id
    .leftJoin('cinemas', 'screens.cinema_id', 'cinemas.cinema_id')  // Join dengan cinemas berdasarkan cinema_id
    .where('booking.booking_id', bookingId)
    .select(
      'movies.poster_image',
      'movies.title as movie_title',
      'booking.seat_number',
      'cinemas.cinema_name',  // Ambil cinema_name dari tabel cinemas
      'booking.booking_id',
      'booking.booking_date',
      'booking.total_amount',
      'booking.name',
      'booking.email',
      'booking.phone'
    );
  },

  addBookingDetail: async (bookingId) => {
    return await knex('bookings_details').insert({
      booking_id: bookingId
    }).returning('*'); // Mengembalikan data yang baru dimasukkan
  },

// Menyimpan pembayaran
savePayment: async (bookingId, paymentData) => {
  return await knex('booking')
    .where('booking_id', bookingId)
    .update(paymentData);
},

// Mendapatkan semua pembayaran yang menunggu approval
getPendingPayments: async () => {
  return await knex('booking')
    .where('status', 'Menunggu Konfirmasi')
    .select(
      'booking.booking_id',
      'booking.customer_name',
      'booking.email',
      'booking.phone_number',
      'booking.booking_date',
      'booking.total_amount',
      'booking.payment_method',
      'booking.payment_proof',
      'movies.title as movie_title',
      'booking.seat_number',
      'booking.status'
    )
    .leftJoin('showtimes', 'booking.showtime_id', 'showtimes.showtime_id')
    .leftJoin('movies', 'showtimes.movie_id', 'movies.movie_id');
  },
};


module.exports = Booking;
