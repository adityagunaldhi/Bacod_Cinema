const db = require('../config/config'); // Import konfigurasi database

//Mengambil semua data screens
const getAllScreens = async () => {
  try {
    return await db('screens').select();
  } catch (error) {
    throw error;
  }
};

//Menambah data screens
const createScreen = async (data) => {
  try {
    return await db('screens').insert(data);
  } catch (error) {
    throw error;
  }
};

//Update data Screens berdasarkan Screen id
const updateScreens = async (id, data) => {
  try {
    return await db('screens').where('screen_id', id).update(data);
  } catch (error) {
    throw error;
  }
};

//Hapus data screens berdasarkan id
const deleteScreens = async (id) => {
  try {
    return await db('screens').where('screen_id', id).del();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllScreens,
  createScreen,
  updateScreens,
  deleteScreens,
};