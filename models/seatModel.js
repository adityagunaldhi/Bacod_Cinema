const db = require('../config/config');

<<<<<<< HEAD
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
=======
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
    
>>>>>>> e17d88859702b66943a44fa4c29bf852766dfdc1
    throw error;
  }
};

<<<<<<< HEAD
// Menambah kursi baru
const addSeat = async (data) => {
  try {
    const result = await db('seats').insert(data).returning('*');
    return result;
  } catch (error) {
    console.error('Error in addSeat:', error);
=======
//Menambah data seats
const addSeat = async (data) => {
  try {
    return await db('seats').insert(data);
  } catch (error) {
>>>>>>> e17d88859702b66943a44fa4c29bf852766dfdc1
    throw error;
  }
};

<<<<<<< HEAD
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
=======
// Update seats berdasarkan seat_id bilamana seats is booked
const updateSeatStatus = async (seat_id, status) => {
  try {
    return await db('seats').where('seat_id', seat_id).update({ is_booked: status });
  } catch (error) {
>>>>>>> e17d88859702b66943a44fa4c29bf852766dfdc1
    throw error;
  }
};

<<<<<<< HEAD
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
=======
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
>>>>>>> e17d88859702b66943a44fa4c29bf852766dfdc1
    throw error;
  }
};

<<<<<<< HEAD
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


=======
>>>>>>> e17d88859702b66943a44fa4c29bf852766dfdc1

module.exports = {
  getAllSeats,
  addSeat,
  updateSeatStatus,
<<<<<<< HEAD
  checkAvailableSeats,
  getSeatsByShowtime,
=======
>>>>>>> e17d88859702b66943a44fa4c29bf852766dfdc1
};
