// controllers/TransactionController.js
const Booking = require('../models/transactionModel');

const getTransactionDetails = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const transactionDetails = await Booking.getById(bookingId);

    if (transactionDetails.length === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    // Kirimkan data transaksi ke frontend
    res.status(200).json({
      success: true,
      data: transactionDetails[0] // Ambil objek pertama karena kita hanya mencari berdasarkan bookingId
    });
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  getTransactionDetails
};
