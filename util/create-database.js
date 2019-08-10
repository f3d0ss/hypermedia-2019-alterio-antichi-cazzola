var mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "q1W@e3R$t5"
});
// now get a Promise wrapped instance of that pool
const promisePool = pool.promise();


promisePool
    .query("DROP DATABASE festivalDB")
    .then(() =>
        createDatabase()
    ).catch(err =>
        createDatabase()
    );

function createDatabase() {
    promisePool
        .query("CREATE DATABASE festivalDB")
        .then(() => {
            console.log("Database created");
            const pool = mysql.createPool({
                host: 'localhost',
                user: 'root',
                database: 'festivalDB',
                password: 'q1W@e3R$t5'
            });
            const promisePoolDb = pool.promise();
            return promisePoolDb.query(`CREATE TABLE User (
                id int PRIMARY KEY AUTO_INCREMENT,
                email varchar(255) NOT NULL,
                password varchar(255) NOT NULL
            );`);
        }).catch(err => console.log(err));
}