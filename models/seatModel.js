const db = require('../config/config');

//Mengambil data seats berdasarkan screen_id
const getAllSeats = async (screen_id) => {
  try {
    let data = await db('seats').select('*').where('screen_id', screen_id);
    const seatsWithAvailability = await db('seats')
    .select(
      'seats.*',
      // 'seats.seat_number', // Assuming there's a seat_number column
      // 'seats.row', // Assuming there's a row column
      db.raw(
        `CASE 
          WHEN EXISTS (
            SELECT 1 
            FROM booking_details 
            JOIN bookings ON booking_details.booking_id = bookings.booking_id
            JOIN showtimes ON bookings.showtime_id = showtimes.showtime_id
            WHERE booking_details.seat_id = seats.seat_id AND showtimes.screen_id = ?
          ) THEN 'booked'
          ELSE 'available'
        END AS status`,
        [screen_id]
      )
    );

  return seatsWithAvailability;
  } catch (error) {
    console.log(error);
    
    throw error;
  }
};

//Menambah data seats
const addSeat = async (data) => {
  try {
    return await db('seats').insert(data);
  } catch (error) {
    throw error;
  }
};

// Update seats berdasarkan seat_id bilamana seats is booked
const updateSeatStatus = async (seat_id, status) => {
  try {
    return await db('seats').where('seat_id', seat_id).update({ is_booked: status });
  } catch (error) {
    throw error;
  }
};

const checkAvailableSeats = async (screenId) => {
  try {
    const availableSeats = await db('seats')
      .select('seats.seat_id') // Select seat IDs
      .leftJoin('booking_details', 'seats.seat_id', 'booking_details.seat_id') // Left join to find all seat details
      .leftJoin('bookings', 'booking_details.booking_id', 'bookings.booking_id') // Join bookings
      .leftJoin('showtimes', 'bookings.showtime_id', 'showtimes.showtime_id') // Join showtimes
      .where('showtimes.screen_id', screenId) // Match the screen_id
      .orWhereNull('showtimes.screen_id'); // Include seats not yet booked

    return availableSeats; // Returns an array of available seats
  } catch (error) {
    console.error('Error checking available seats:', error);
    throw error;
  }
};


module.exports = {
  getAllSeats,
  addSeat,
  updateSeatStatus,
};
