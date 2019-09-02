const mysql = require('mysql2');
const config = require('../configuration/configuration');

const pool = mysql.createPool(process.env.JAWSDB_URL);

module.exports = pool.promise();