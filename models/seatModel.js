const db = require('../config/config');

//Mengambil data seats berdasarkan screen_id
const getAllSeats = async (screen_id) => {
  try {
    return await db('seats').where('screen_id', screen_id);
  } catch (error) {
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

module.exports = {
  getAllSeats,
  addSeat,
  updateSeatStatus,
};
