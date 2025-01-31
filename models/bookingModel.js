const db = require('../config/config');

//Mengambil semua data booking berdasarkan user_id
const getAllBookings = async (user_id) => {
  try {
    return await db('booking').where('user_id', user_id);
  } catch (error) {
    throw error;
  }
};

//Menambahkan booking baru
const addBooking = async (data) => {
  try {
    return await db('booking').insert(data);
  } catch (error) {
    throw error;
  }
};

// Update status booking
const updateBookingStatus = async (booking_id, status) => {
  try {
    return await db('booking').where('booking_id', booking_id).update({ status });
  } catch (error) {
    throw error;
  }
};


const createMultipleBookings = async (booking) => {
    try {
        const bookingIds = await db('booking').insert(booking);
        return bookingIds;
    } catch (error) {
      if (error.code === '23505')
        console.error('Error creating bookings:', error);
        throw new error('Seat is already booked');
    }
};

const getExistingBookings = async (showtime_id, seatArray) => {
  if (!seatArray || seatArray.length === 0){
    return [];
  }
  console.log(seatArray, showtime_id);
  
  const existingBookings = await db('booking')
      .select('seat_number')
      .where('showtime_id', showtime_id)
      .whereIn('seat_number', seatArray);
  return existingBookings.map(b => b.seat_number);
};



module.exports = {
  getAllBookings,
  addBooking,
  updateBookingStatus,
  createMultipleBookings,
  getExistingBookings,
};
