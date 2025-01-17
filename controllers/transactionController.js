// controllers/TransactionController.js
const Booking = require('../models/transactionModel');

// Mendapatkan detail transaksi berdasarkan ID
const getTransactionDetails = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const transactionDetails = await Booking.getById(bookingId);

    if (!transactionDetails || transactionDetails.length === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    res.status(200).json({
      success: true,
      data: transactionDetails[0], // Ambil data transaksi pertama
    });
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Menyimpan data pembayaran
const savePayment = async (req, res) => {
  const { bookingId } = req.params;
  const { paymentMethod, paymentProof } = req.body;

  try {
    const updateResult = await Booking.savePayment(bookingId, {
      payment_method: paymentMethod,
      payment_proof: paymentProof,
      status: 'Menunggu Konfirmasi', // Set status ke menunggu konfirmasi
    });

    if (updateResult === 0) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    res.status(200).json({ success: true, message: 'Payment saved successfully' });
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Mendapatkan daftar pembayaran yang menunggu persetujuan
const getPendingPayments = async (req, res) => {
  try {
    const pendingPayments = await Booking.getPendingPayments();

    res.status(200).json({
      success: true,
      data: pendingPayments,
    });
  } catch (error) {
    console.error('Error fetching pending payments:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = {
  getTransactionDetails,
  savePayment,
  getPendingPayments,
};
