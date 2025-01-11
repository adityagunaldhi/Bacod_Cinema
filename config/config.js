//Koneksi database dengan knex
const knex = require('knex');

const db = knex({
  client: 'mysql',
  connection: {
    host: 'mysql.bacod.id',
    port: 3306,
    user: 'kelompok1',
    password: '11223344',
    database: 'bioskop',
  },
});

module.exports = db;
