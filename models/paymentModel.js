const db = require('../config/config');

//Mengambil payment berdasarkan booking_id
const getPayment = async (booking_id) => {
  try {
    return await db('payments').where('booking_id', booking_id).first();
  } catch (error) {
    throw error;
  }
};


const createPayment = async ({ booking_id, payment_method, amount, payment_date }) => {
  // Ambil detail booking dan tabel terkait
  const booking = await db('booking as b')
      .select(
          'b.total_amount',
          'm.title as movie_title',
          'c.cinema_name',
          's.screen_name',
          'b.seat_number',
          'b.name',
          'b.email',
          'b.phone'
      )
      .innerJoin('showtimes as st', 'b.showtime_id', 'st.showtime_id')
      .innerJoin('movies as m', 'st.movie_id', 'm.movie_id')
      .innerJoin('screens as s', 'st.screen_id', 's.screen_id')
      .innerJoin('cinemas as c', 's.cinema_id', 'c.cinema_id')
      .where('b.booking_id', booking_id)
      .first();
      
  if (!booking) {
      throw new Error('Booking tidak ditemukan!');
  }

  // Pastikan `amount` diisi jika belum diberikan
  amount = amount || booking.total_amount;

  // Masukkan data ke tabel payments
  await db('payments').insert({
      booking_id,
      payment_method,
      amount, // Pastikan terisi
      payment_status: 'Pending',
      payment_date,
      movie_title: booking.movie_title,
      seat_number: booking.seat_number,
      cinema_name: booking.cinema_name,
      screen_name: booking.screen_name,
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
  });
  return { success: true, booking_id: booking_id};
};

// Update payment status
const updatePaymentStatus = async (payment_id, status) => {
  try {
    return await db('payments').where('payment_id', payment_id).update({ payment_status: status });
  } catch (error) {
    throw error;
  }
};

// Mengambil semua pembayaran
const getAllPayments = async () => {
  try {
    return await db('payments')
      .join('booking', 'payments.booking_id', '=', 'booking.booking_id')
      .join('showtimes', 'booking.showtime_id', '=', 'showtimes.showtime_id')
      .join('movies', 'showtimes.movie_id', '=', 'movies.movie_id')
      .join('screens', 'showtimes.screen_id', '=', 'screens.screen_id')
      .join('cinemas', 'screens.cinema_id', '=', 'cinemas.cinema_id')
      .select(
        'payments.payment_id',
        'payments.payment_method',
        'payments.payment_status',
        'payments.amount',
        'payments.payment_date',
        'movies.title as movie_title',
        'movies.poster_image',
        'cinemas.cinema_name',
        'showtimes.start_time as schedule',
        'booking.seat_number',
        'booking.booking_date',
        'booking.total_amount'
      );
  } catch (error) {
    throw error;
  }
};

const getPaymentStatus = async (bookingId) => {
  try {
    // Mengambil status pembayaran berdasarkan booking_id
    const payment = await db('payments')
      .select('payment_status')
      .where('booking_id', bookingId)
      .first();
    
    return payment; // Mengembalikan data status pembayaran
  } catch (error) {
    throw error; // Jika ada error, lemparkan ke controller
  }
};

module.exports = {
  getPayment,
  createPayment,
  updatePaymentStatus,
  getAllPayments,
  getPaymentStatus, // Tambahkan fungsi baru
};

