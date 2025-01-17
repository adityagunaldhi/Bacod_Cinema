// controllers/invoiceController.js
const invoiceModel = require('../models/invoiceModel');

// Fungsi untuk menangani request invoice berdasarkan booking_id
const getInvoice = async (req, res) => {
    const { booking_id } = req.params; // Ambil booking_id dari parameter URL

    try {
        const invoiceData = await invoiceModel.getInvoiceData(booking_id); // Ambil data dari model
        if (invoiceData) {
            res.status(200).json(invoiceData); // Kirimkan data sebagai response
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        console.error('Error fetching invoice data:', error);
        res.status(500).json({ message: 'Error fetching invoice data' });
    }
};

module.exports = {
    getInvoice
};
