const db = require('../config/config');

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
            );
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

module.exports = { getPayments, updatePaymentStatus };
