const bookingsDetailsModel = require('../models/bookingDetailsModel');

//Mengambil booking detail berdasarkan booking_id
const getBookingDetailsByBookingId = async (req, res) => {
    const { booking_id } = req.params;
    try {
        const bookingDetails = await bookingsDetailsModel.getBookingDetailsByBookingId(booking_id);
        if (!bookingDetails || bookingDetails.length === 0) {
            return res.status(404).json({ success: false, message: 'No booking details found' });
        }
        res.json({ success: true, bookingDetails });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching booking details', error });
    }
};

// Membuat detail booking baru
const createBookingDetail = async (req, res) => {
    const { booking_id, seat_id } = req.body;
    try {
        const newBookingDetail = await bookingsDetailsModel.createBookingDetail(booking_id, seat_id);
        res.status(201).json({ success: true, message: 'Booking detail created successfully', newBookingDetail });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating booking detail', error });
    }
};

module.exports = { getBookingDetailsByBookingId, createBookingDetail };
