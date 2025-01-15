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
        const [payment_id] = await knex('payment').insert({
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
const updatePaymentStatus = async (req, res) => {
    const { payment_id } = req.params;
    const { payment_status } = req.body;

    // Validasi payment_status
    const validStatuses = ['Pending', 'Completed'];
    if (!validStatuses.includes(payment_status)) {
        return res.status(400).json({ message: `Invalid payment status. Allowed values: ${validStatuses.join(', ')}` });
    }

    try {
        // Perbarui status pembayaran di database
        const updated = await knex('payment')
            .where({ payment_id })
            .update({ payment_status });

        if (updated) {
            res.status(200).json({ success: true, message: 'Payment status updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating payment status', error });
    }
};

// Mendapatkan detail pembayaran berdasarkan booking_id
const getPaymentByBooking = async (req, res) => {
    const { booking_id } = req.params;

    try {
        const payment = await knex('payment').where({ booking_id }).first();

        if (payment) {
            res.status(200).json(payment);
        } else {
            res.status(404).json({ success: false, message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error retrieving payment', error });
    }
};

module.exports = {
    createPayment,
    updatePaymentStatus,
    getPaymentByBooking,
};
