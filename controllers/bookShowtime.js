const showtimesModel = require('../models/showtimesModel');
const seatsModel = require('../models/seatModel');
const bookingsModel = require('../models/bookingsModel');
const paymentModel = require('../models/paymentModel');

const bookShowtime = async (req, res) => {
    const { showtime_id } = req.params;
    const { seats, totalAmount, paymentMethod } = req.body;

    // Pastikan user sudah login
    if (!req.user) {
        return res.status(401).json({ message: 'Please log in first' });
    }

    try {
        // Ambil data showtime
        const showtime = await showtimesModel.getShowtimeById(showtime_id);
        if (!showtime) {
            return res.status(404).json({ message: 'Showtime not found' });
        }

        // Ambil data semua kursi pada showtime ini
        const allSeats = await seatsModel.getSeatsByShowtime(showtime_id);
        const unavailableSeats = seats.filter(seat_id => 
            allSeats.find(seat => seat.seat_id === seat_id && seat.status === 'booked')
        );

        // Jika ada kursi yang sudah terbooking
        if (unavailableSeats.length > 0) {
            return res.status(400).json({ message: `Seats ${unavailableSeats.join(', ')} are already booked` });
        }

        // 1. Buat booking baru di tabel bookings
        const booking = await bookingsModel.createBooking({
            user_id: req.user.user_id,
            totalAmount,
        });

        // 2. Buat detail booking (hubungkan kursi dengan booking)
        await bookingsModel.createBookingDetails(booking.insertId, seats);

        // 3. Update status kursi menjadi 'booked'
        for (const seat_id of seats) {
            await seatsModel.updateSeatStatus(seat_id, 'booked');
        }

        // 4. Proses pembayaran
        const payment = await paymentModel.createPayment(booking.insertId, paymentMethod, totalAmount);

        // 5. Kembalikan response sukses
        res.json({
            message: 'Booking successful',
            booking: { booking_id: booking.insertId, totalAmount, status: 'pending' },
            payment,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error booking showtime', error });
    }
};

module.exports = { bookShowtime };
