const db = require('../config/config');

// Mengambil semua kursi beserta statusnya berdasarkan screen_id
const getAllSeats = async (screen_id) => {
  try {
    const seats = await db('seats')
      .select(
        'seats.seat_id',
        'seats.seat_number',
        'seats.seat_type',
        db.raw(`
          CASE 
            WHEN EXISTS (
              SELECT 1 
              FROM booking_details 
              JOIN bookings ON booking_details.booking_id = bookings.booking_id
              JOIN showtimes ON bookings.showtime_id = showtimes.showtime_id
              WHERE booking_details.seat_id = seats.seat_id 
                AND showtimes.screen_id = ?
            ) THEN 'booked'
            ELSE 'available'
          END AS status
        `, [screen_id])
      )
      .where('seats.screen_id', screen_id);

    return seats;
  } catch (error) {
    console.error('Error in getAllSeats:', error);
    throw error;
  }
};

// Menambah kursi baru
const addSeat = async (data) => {
  try {
    const result = await db('seats').insert(data).returning('*');
    return result;
  } catch (error) {
    console.error('Error in addSeat:', error);
    throw error;
  }
};

// Mengupdate status kursi berdasarkan seat_id
const updateSeatStatus = async (seat_id, status) => {
  try {
    const result = await db('seats')
      .where('seat_id', seat_id)
      .update({ is_booked: status })
      .returning('*');

    return result;
  } catch (error) {
    console.error('Error in updateSeatStatus:', error);
    throw error;
  }
};

// Mengecek ketersediaan kursi berdasarkan screen_id
const checkAvailableSeats = async (screen_id) => {
  try {
    const availableSeats = await db('seats')
      .select('seat_id', 'seat_number', 'seat_type')
      .where('screen_id', screen_id)
      .andWhere('is_booked', false);

    return availableSeats;
  } catch (error) {
    console.error('Error in checkAvailableSeats:', error);
    throw error;
  }
};

const getSeatsByShowtime = async (showtime_id) => {
  try {
    const seats = await db('seats')
      .select(
        'seats.seat_id',
        'seats.seat_number',
        'seats.seat_type',
        db.raw(`
          CASE 
            WHEN EXISTS (
              SELECT 1 
              FROM booking_details 
              JOIN bookings ON booking_details.booking_id = bookings.booking_id
              WHERE booking_details.seat_id = seats.seat_id 
                AND bookings.showtime_id = ?
            ) THEN 'booked'
            ELSE 'available'
          END AS status
        `, [showtime_id])
      )
      .whereIn(
        'seats.seat_id',
        db('screens')
          .select('seat_id')
          .join('showtimes', 'screens.screen_id', 'showtimes.screen_id')
          .where('showtimes.showtime_id', showtime_id)
      );

    return seats;
  } catch (error) {
    console.error('Error in getSeatsByShowtime:', error);
    throw error;
  }
};



module.exports = {
  getAllSeats,
  addSeat,
  updateSeatStatus,
  checkAvailableSeats,
  getSeatsByShowtime,
};
