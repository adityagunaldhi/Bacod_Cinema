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

const createBooking = async (req, res) => {
  const { showtime_id, seat_numbers, total_amount } = req.body;

  
  // Validasi input
  if (!showtime_id || !seat_numbers || !total_amount) {
      return res.status(400).json({ 
          success: false, 
          message: 'Missing required fields.' 
      });
  }

  const bookingDate = new Date();
  const status = 'confirmed';

  try {
      // Validasi apakah ada kursi yang sudah dipesan
      const seatArray = seat_numbers.split(',').map(seat => seat.trim());
      const existingBookings = await bookingModel.getExistingBookings(showtime_id, seatArray);

      if (existingBookings.length > 0) {
          const occupiedSeats = existingBookings.map(b => b.seat_number);
          return res.status(400).json({
              success: false,
              message: 'Some seats are already booked.',
              occupiedSeats,
          });
      }

      // Gabungkan semua kursi ke satu string
      const seatString = seatArray.join(',');

      // Simpan booking sebagai satu entri
      const bookingId = await bookingModel.createMultipleBookings({
          showtime_id,
          seat_number: seatString,
          total_amount,
          booking_date: bookingDate,
          status,
      });

      res.status(201).json({
          success: true,
          message: 'Booking created successfully!',
          booking_id: bookingId,
      });
  } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({
          success: false,
          message: 'Failed to create booking.',
          error: error.message,
      });
  }
};




module.exports = {
  getBookings,
  addBooking,
  updateBookingStatus,
  createBooking,
};
