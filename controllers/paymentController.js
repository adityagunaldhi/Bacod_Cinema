const paymentModel = require('../models/paymentModel');

// Menambahkan pembayaran baru
const createPayment = async (req, res) => {
    const { booking_id, payment_method, amount } = req.body;

    // Validasi input
    if (!booking_id || !payment_method || !amount) {
        return res.status(400).json({ message: 'Booking ID, payment method, and amount are required' });
    }

    // Validasi payment_method
    const validMethods = ['Credit Card', 'Cash'];
    if (!validMethods.includes(payment_method)) {
        return res.status(400).json({ message: `Invalid payment method. Allowed values: ${validMethods.join(', ')}` });
    }

    try {
        // Buat entri baru di tabel payment
        const [payment_id] = await knex('payments').insert({
            booking_id,
            payment_method,
            payment_status: 'Pending', // Default status
            amount,
            payment_date: new Date(), // Tanggal saat ini
        });

        res.status(201).json({ success: true, message: 'Payment created successfully', payment_id });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating payment', error });
    }
};

// Mengupdate status pembayaran
// const updatePaymentStatus = async (req, res) => {
//     const { payment_id } = req.params;
//     const { payment_status } = req.body;

//     // Validasi payment_status
//     const validStatuses = ['Pending', 'Completed'];
//     if (!validStatuses.includes(payment_status)) {
//         return res.status(400).json({ message: `Invalid payment status. Allowed values: ${validStatuses.join(', ')}` });
//     }

//     try {
//         // Perbarui status pembayaran di database
//         const updated = await knex('payments')
//             .where({ payment_id })
//             .update({ payment_status });

//         if (updated) {
//             res.status(200).json({ success: true, message: 'Payment status updated successfully' });
//         } else {
//             res.status(404).json({ success: false, message: 'Payment not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error updating payment status', error });
//     }
// };

// Mendapatkan detail pembayaran berdasarkan booking_id
const getPaymentByBooking = async (req, res) => {
    const { booking_id } = req.params;

    try {
        const payment = await knex('payments').where({ booking_id }).first();

        if (payment) {
            res.status(200).json(payment);
        } else {
            res.status(404).json({ success: false, message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving payment', error });
    }
};

// Mendapatkan semua pembayaran
const getAllPayments = async (req, res) => {
    try {
      const payments = await paymentModel.getAllPayments();
      res.status(200).json({ success: true, payments });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error retrieving payments', error });
    }
  };
  const db = require('../config/config');

const completePayment = async (req, res) => {
    try {
        const { booking_id, payment_method } = req.body;

        if (!booking_id || !payment_method) {
            return res.status(400).json({ success: false, message: 'Booking ID dan metode pembayaran diperlukan.' });
        }

        // Ambil total_amount dari tabel booking
        const booking = await db('booking').select('total_amount').where({ booking_id }).first();

        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking tidak ditemukan.' });
        }

        const amount = booking.total_amount; // Ambil total amount
        const payment_date = new Date();

        // Panggil fungsi createPayment di model
        await paymentModel.createPayment({ booking_id, payment_method, amount, payment_date });

        return res.status(200).json({ success: true, message: 'Pembayaran berhasil diproses.', booking_id });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Terjadi kesalahan server.', error });
    }
};


// Endpoint untuk mendapatkan semua pembayaran
const getPayments = async (req, res) => {
    try {
        const payments = await db('payments')
            .select(
                'payment_id',
                'name',
                'email',
                'phone',
                'payment_date',
                'amount',
                'payment_method',
                'movie_title',
                'seat_number',
                'cinema_name',
                'screen_name',
                'payment_status'
            )
            .whereNotNull('name') // Menghindari hasil kosong jika name kosong
            .whereNotNull('email') // Menghindari hasil kosong jika email kosong
            .whereNotNull('phone'); // Menghindari hasil kosong jika phone kosong
            
        console.log('Payments fetched from database:', payments);
            
        return res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error('Error fetching payments:', error);
        return res.status(500).json({ success: false, message: 'Gagal mendapatkan data pembayaran.' });
    }
};

// Endpoint untuk memperbarui status pembayaran
const updatePaymentStatus = async (req, res) => {
    const { payment_id } = req.params;
    const { payment_status } = req.body;

    if (!['Completed', 'Rejected'].includes(payment_status)) {
        return res.status(400).json({ success: false, message: 'Status pembayaran tidak valid.' });
    }

    try {
        const result = await db('payments')
            .where({ payment_id })
            .update({ payment_status });

        if (result) {
            return res.status(200).json({ success: true, message: `Pembayaran ${payment_status === 'Completed' ? 'disetujui' : 'ditolak'}.` });
        } else {
            return res.status(404).json({ success: false, message: 'Pembayaran tidak ditemukan.' });
        }
    } catch (error) {
        console.error('Error updating payment status:', error);
        return res.status(500).json({ success: false, message: 'Gagal memperbarui status pembayaran.' });
    }
};

const getPaymentStatus = async (req, res) => {
    try {
      const { bookingId } = req.params; // Mendapatkan booking_id dari URL parameter
      
      // Memanggil model untuk mendapatkan status pembayaran
      const payment = await paymentModel.getPaymentStatus(bookingId);
      
      // Jika tidak ada data pembayaran ditemukan
      if (!payment) {
        return res.status(404).json({
          success: false,
          message: 'Payment not found',
        });
      }
  
      // Mengembalikan status pembayaran
      return res.status(200).json({
        success: true,
        status: payment.payment_status, // Mengembalikan status pembayaran
      });
    } catch (error) {
      console.error('Error fetching payment status:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch payment status',
      });
    }
  };
  


  
  module.exports = {
    createPayment,
    updatePaymentStatus,
    getPaymentByBooking,
    getAllPayments,
    completePayment,
    getPayments,
    updatePaymentStatus,
    getPaymentStatus,
  };
  
