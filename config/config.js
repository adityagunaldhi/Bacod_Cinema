//Koneksi database dengan knex
const knex = require('knex');

const db = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'ticketing_bioskop',
  },
});

module.exports = db;
