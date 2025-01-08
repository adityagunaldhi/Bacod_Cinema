const bookingModel = require('../models/bookingModel');

//Mengambil semua booking berdasarkan user_id
const getBookings = async (req, res) => {
  const { user_id } = req.params;
  try {
    const bookings = await bookingModel.getAllBookings(user_id);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

//Menambahkan booking baru
const addBooking = async (req, res) => {
  const data = req.body;
  try {
    const result = await bookingModel.addBooking(data);
    res.json({ message: 'Booking successfully added', id: result[0] });
  } catch (error) {
    res.status(500).json({ message: 'Error adding booking', error });
  }
};

//Update status booking
const updateBookingStatus = async (req, res) => {
  const { booking_id } = req.params;
  const { status } = req.body;
  try {
    const result = await bookingModel.updateBookingStatus(booking_id, status);
    if (result) {
      res.json({ message: 'Booking status updated' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error });
  }
};

module.exports = {
  getBookings,
  addBooking,
  updateBookingStatus,
};
