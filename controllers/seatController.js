const seatModel = require('../models/seatModel');

<<<<<<< HEAD
// Mengambil semua kursi beserta statusnya berdasarkan screen_id
const getSeatsByScreen = async (req, res) => {
  try {
    const { screen_id } = req.params;

    if (!screen_id) {
      return res.status(400).json({ success: false, message: 'Screen ID is required' });
    }

    const seats = await seatModel.getAllSeats(screen_id);
    res.status(200).json({ success: true, data: seats });
  } catch (error) {
    console.error('Error in getSeatsByScreen:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch seats', error: error.message });
  }
};

// Menambah kursi baru
const addSeat = async (req, res) => {
  try {
    const { screen_id, seat_number, seat_type } = req.body;

    if (!screen_id || !seat_number || !seat_type) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newSeat = { screen_id, seat_number, seat_type, is_booked: false };
    const result = await seatModel.addSeat(newSeat);

    res.status(201).json({ success: true, message: 'Seat added successfully', data: result });
  } catch (error) {
    console.error('Error in addSeat:', error);
    res.status(500).json({ success: false, message: 'Failed to add seat', error: error.message });
  }
};

// Memperbarui status kursi
const updateSeatStatus = async (req, res) => {
  try {
    const { seat_id } = req.params;
    const { is_booked } = req.body;

    if (typeof is_booked !== 'boolean') {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const updatedSeat = await seatModel.updateSeatStatus(seat_id, is_booked);

    if (!updatedSeat) {
      return res.status(404).json({ success: false, message: 'Seat not found' });
    }

    res.status(200).json({ success: true, message: 'Seat status updated successfully', data: updatedSeat });
  } catch (error) {
    console.error('Error in updateSeatStatus:', error);
    res.status(500).json({ success: false, message: 'Failed to update seat status', error: error.message });
  }
};

// Mengecek kursi yang tersedia
const checkAvailableSeats = async (req, res) => {
  try {
    const { screen_id } = req.params;

    if (!screen_id) {
      return res.status(400).json({ success: false, message: 'Screen ID is required' });
    }

    const availableSeats = await seatModel.checkAvailableSeats(screen_id);

    res.status(200).json({ success: true, data: availableSeats });
  } catch (error) {
    console.error('Error in checkAvailableSeats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch available seats', error: error.message });
  }
};

const getSeatsByShowtime = async (req, res) => {
  try {
    const { showtime_id } = req.params;

    if (!showtime_id) {
      return res.status(400).json({ success: false, message: 'Showtime ID is required' });
    }

    const seats = await seatModel.getSeatsByShowtime(showtime_id);
    res.status(200).json({ success: true, data: seats });
  } catch (error) {
    console.error('Error in getSeatsByShowtime:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch seats by showtime', error: error.message });
  }
};


module.exports = {
  getSeatsByScreen,
  addSeat,
  updateSeatStatus,
  checkAvailableSeats,
  getSeatsByShowtime,
=======
//Mengambil semua data kursi berdasarkan screen_id
const getSeats = async (req, res) => {
  const query = req.query;
  try {
    console.log(query);
    
    const seats = await seatModel.getAllSeats(query.screen_id);
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seats', error });
  }
};

//Menambahkan data kursi
const addSeat = async (req, res) => {
  const data = req.body;
  try {
    const result = await seatModel.addSeat(data);
    res.json({ message: 'Seat successfully added', id: result[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error adding seat', error });
  }
};

//Update data kursi berdasarkan seat_id
const updateSeatStatus = async (req, res) => {
  const { seat_id } = req.params;
  const { status } = req.body;
  try {
    const result = await seatModel.updateSeatStatus(seat_id, status);
    if (result) {
      res.json({ message: 'Seat status updated' });
    } else {
      res.status(404).json({ message: 'Seat not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating seat status', error });
  }
};

module.exports = {
  getSeats,
  addSeat,
  updateSeatStatus,
>>>>>>> e17d88859702b66943a44fa4c29bf852766dfdc1
};
