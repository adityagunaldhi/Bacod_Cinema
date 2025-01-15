const db = require('../config/config');

//Mengambil semua data movies
const getAllMovies = async () => {
  try {
    return await db('movies').select();
  } catch (error) {
    throw error;
  }
};

//Menambah data movies
const addMovies = async (data) => {
  try {
    return await db('movies').insert(data);
  } catch (error) {
    throw error;
  }
};

//Update data movies berdasarkan movie_id
const updateMovies = async (id, data) => {
  try {
    return await db('movies').where('movie_id', id).update(data);
  } catch (error) {
    throw error;
  }
};

//Hapus mdata movies berdasarkan movie_id
const deleteMovies = async (id) => {
  try {
    return await db('movies').where('movie_id', id).del();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllMovies,
  addMovies,
  updateMovies,
  deleteMovies,
};
