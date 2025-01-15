const db = require('../config/config');

//Mengambil payment berdasarkan booking_id
const getPayment = async (booking_id) => {
  try {
    return await db('payments').where('booking_id', booking_id).first();
  } catch (error) {
    throw error;
  }
};

//Menambahkan payment
const addPayment = async (data) => {
  try {
    return await db('payments').insert(data);
  } catch (error) {
    throw error;
  }
};

// Update payment status
const updatePaymentStatus = async (payment_id, status) => {
  try {
    return await db('payments').where('payment_id', payment_id).update({ payment_status: status });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPayment,
  addPayment,
  updatePaymentStatus,
};
