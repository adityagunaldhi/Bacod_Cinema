// models/invoiceModel.js

const db = require('../config/config');  // Import konfigurasi database

// Fungsi untuk mengambil data invoice berdasarkan booking_id
const getInvoiceData = async (booking_id) => {
    try {
        const booking = await db('booking as b')
            .select(
                'b.total_amount',
                'b.name',
                'b.email',
                'b.phone',
                'm.title as movie_title',
                'c.cinema_name',
                's.screen_name',
                'b.seat_number',
                'st.start_time as movie_date',
                'b.booking_date'
            )
            .innerJoin('showtimes as st', 'b.showtime_id', 'st.showtime_id')
            .innerJoin('movies as m', 'st.movie_id', 'm.movie_id')
            .innerJoin('screens as s', 'st.screen_id', 's.screen_id')
            .innerJoin('cinemas as c', 's.cinema_id', 'c.cinema_id')
            .where('b.booking_id', booking_id)
            .first(); // Mengambil hanya 1 data

        return booking;
    } catch (error) {
        throw new Error('Error fetching booking data');
    }
};

module.exports = {
    getInvoiceData
};
