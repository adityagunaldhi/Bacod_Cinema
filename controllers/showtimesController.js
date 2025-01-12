const showtimesModel = require('../models/showtimesModel');

//Mengambil semua data showtime
const getAllShowtimes = async (req, res) => {
    try {
        const showtimes = await showtimesModel.getAllShowtimes();
        res.json({ success: true, showtimes });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ success: false, message: 'Error fetching showtimes', error });
    }
};

//Mengambil semua data showtime berdasarkan showtime_id
const getShowtimeById = async (req, res) => {
    const { showtime_id } = req.params;
    try {
        if (!showtime_id) {
            return res.status(400).json({ success: false, message: 'Invalid showtime_id' });
        }

        const showtime = await showtimesModel.getShowtimeById(showtime_id);

        if (!showtime) {
            return res.status(404).json({ success: false, message: 'Showtime not found' });
        }

        const availableSeats = await showtimesModel.getAvailableSeats(showtime_id);
        showtime.available_seats = availableSeats;

        res.json({ success: true, showtime });
    } catch (error) {
        console.error('Error in getShowtimeById:', error); // Logging error untuk debug
        res.status(500).json({
            success: false,
            message: 'Error fetching showtime',
            error: error.message || error // Memberikan detail error
        });
    }
};


//Menambahkan showtime
const createShowtime = async (req, res) => {
    const { movie_id, screen_id, start_time, end_time, price } = req.body;
    try {
        const newShowtime = await showtimesModel.createShowtime(movie_id, screen_id, start_time, end_time, price);
        res.status(201).json({ success: true, message: 'Showtime created successfully', newShowtime });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating showtime', error });
    }
};

module.exports = { getAllShowtimes, getShowtimeById, createShowtime };
