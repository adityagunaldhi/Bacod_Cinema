const Screen = require('../models/screenModel');

// Mendapatkan semua screens
const getAllScreens = async (req, res) => {
  try {
    const screens = await Screen.getAllScreens();
    res.json({ success: true, data: screens });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching screens', error });
  }
};

// Mendapatkan screen berdasarkan ID
const getScreenById = async (req, res) => {
  const { screenId } = req.params;
  try {
    const screen = await Screen.getScreenById(screenId);
    if (!screen) {
      return res.status(404).json({ success: false, message: 'Screen not found' });
    }
    res.json({ success: true, data: screen });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching screen', error });
  }
};

// Menambahkan screen baru
const createScreen = async (req, res) => {
  const { cinema_id, screen_name, total_seats } = req.body;

  // Validasi input
  if (!cinema_id || !screen_name || !total_seats) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const newScreen = {
      cinema_id,
      screen_name,
      total_seats,
    };
    const screenId = await Screen.createScreen(newScreen);
    res.status(201).json({ success: true, message: 'Screen created successfully', screenId });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating screen', error });
  }
};

// Memperbarui screen
const updateScreen = async (req, res) => {
  const { screenId } = req.params;
  const { screen_name, total_seats } = req.body;

  try {
    const updated = await Screen.updateScreen(screenId, { screen_name, total_seats });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Screen not found' });
    }
    res.json({ success: true, message: 'Screen updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating screen', error });
  }
};

// Menghapus screen
const deleteScreen = async (req, res) => {
  const { screenId } = req.params;

  try {
    const deleted = await Screen.deleteScreen(screenId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Screen not found' });
    }
    res.json({ success: true, message: 'Screen deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting screen', error });
  }
};

module.exports = {
  getAllScreens,
  getScreenById,
  createScreen,
  updateScreen,
  deleteScreen,
};
