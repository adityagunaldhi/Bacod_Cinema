const moviesModel = require('../models/moviesModel');

//Mengambil semua data movies
const getMovies = async (req, res) => {
  try {
    const movies = await moviesModel.getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Movies', error });
  }
};

//Menambahkan movies
const addMovies = async (req, res) => {
  const { title, description, duration, genre, release_date, rating, poster_image } = req.body;
  const newMovies = {
    title,
    description,
    duration,
    genre,
    release_date,
    rating,
    poster_image,
  };

  try {
    const result = await moviesModel.addMovies(newMovies);
    res.json({ message: 'Movies successfully added', id: result[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error adding Movies', error });
  }
};

//Update movies berdasarkan id
const updateMovies = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await moviesModel.updateMovies(id, data);
    if (result) {
      res.json({ message: 'Movies successfully updated' });
    } else {
      res.status(404).json({ message: 'Movies not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating Movies', error });
  }
};

//Hapus movies berdasarkan id
const deleteMovies = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await moviesModel.deleteMovies(id);
    if (result) {
      res.json({ message: 'Movies successfully deleted' });
    } else {
      res.status(404).json({ message: 'Movies not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Movies', error });
  }
};

module.exports = {
  getMovies,
  addMovies,
  updateMovies,
  deleteMovies,
};
