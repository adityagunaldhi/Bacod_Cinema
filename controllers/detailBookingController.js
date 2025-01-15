// controllers/BookingDetailsController.js
const Booking = require('../models/transactionModel');

const addBookingDetail = async (req, res) => {
  const { booking_id } = req.body;

  try {
    const newBookingDetail = await Booking.addBookingDetail(booking_id);

    res.status(201).json({
      success: true,
      message: 'Booking detail berhasil ditambahkan',
      data: newBookingDetail
    });
  } catch (error) {
    console.error('Error adding booking detail:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  addBookingDetail
};
