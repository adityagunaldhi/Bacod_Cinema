const db = require('../config/config');

//Mengambil semua data booking berdasarkan user_id
const getAllBookings = async (user_id) => {
  try {
    return await db('bookings').where('user_id', user_id);
  } catch (error) {
    throw error;
  }
};

//Menambahkan booking baru
const addBooking = async (data) => {
  try {
    return await db('bookings').insert(data);
  } catch (error) {
    throw error;
  }
};

// Update status booking
const updateBookingStatus = async (booking_id, status) => {
  try {
    return await db('bookings').where('booking_id', booking_id).update({ status });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllBookings,
  addBooking,
  updateBookingStatus,
};
