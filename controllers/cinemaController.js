const cinemaModel = require('../models/cinemaModel');

//Mengambil semua data cinema
const getCinemas = async (req, res) => {
  try {
    const cinemas = await cinemaModel.getAllCinemas();
    res.json(cinemas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cinemas', error });
  }
};

//Menambahkan cinema baru
const addCinema = async (req, res) => {
  const { cinema_name, location, phone_number } = req.body;
  const newCinema = { cinema_name, location, phone_number };
  try {
    const result = await cinemaModel.addCinema(newCinema);
    res.json({ message: 'Cinema successfully added', id: result[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error adding cinema', error });
  }
};

//Update cinema berdasarkan id
const updateCinema = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const result = await cinemaModel.updateCinema(id, data);
    if (result) {
      res.json({ message: 'Cinema successfully updated' });
    } else {
      res.status(404).json({ message: 'Cinema not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating cinema', error });
  }
};

//Hapus cinema berdasarkan id
const deleteCinema = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await cinemaModel.deleteCinema(id);
    if (result) {
      res.json({ message: 'Cinema successfully deleted' });
    } else {
      res.status(404).json({ message: 'Cinema not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cinema', error });
  }
};

module.exports = {
  getCinemas,
  addCinema,
  updateCinema,
  deleteCinema,
};
