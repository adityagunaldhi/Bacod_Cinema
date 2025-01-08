const knex = require('../config/config');

//Mengambil data booking_detail berdasarkan booking_id
const getBookingDetailsByBookingId = async (booking_id) => {
    return await knex('bookings_details').where({ booking_id });
};

//Membuat booking_detail
const createBookingDetail = async (booking_id, seat_id) => {
    return await knex('bookings_details').insert({
        booking_id,
        seat_id,
    });
};

module.exports = {
    getBookingDetailsByBookingId,
    createBookingDetail,
};
