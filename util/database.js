const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'festivalDB',
    password: 'q1W@e3R$t5'
});

module.exports = pool.promise();