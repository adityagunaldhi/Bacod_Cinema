const seatModel = require('../models/seatModel');

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
};
