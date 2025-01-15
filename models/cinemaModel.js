const db = require('../config/config');

//Mengambil semua cinema
const getAllCinemas = async () => {
  try {
    return await db('cinemas').select();
  } catch (error) {
    throw error;
  }
};

//Menambahkan cinema baru
const addCinema = async (data) => {
  try {
    return await db('cinemas').insert(data);
  } catch (error) {
    throw error;
  }
};

//Update cinema berdasarkan id
const updateCinema = async (id, data) => {
  try {
    return await db('cinemas').where('cinema_id', id).update(data);
  } catch (error) {
    throw error;
  }
};

//Hapus cinema berdasarkan id
const deleteCinema = async (id) => {
  try {
    return await db('cinemas').where('cinema_id', id).del();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllCinemas,
  addCinema,
  updateCinema,
  deleteCinema,
};
