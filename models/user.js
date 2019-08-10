const JWT = require('jsonwebtoken');

const db = require('../util/database');
const { SECRET } = require('../configuration/configuration')


module.exports =
    class User {
        constructor(email, password) {
            this.id = null
            this.email = email;
            this.password = password;
            // console.log(this);
        }

        newToken() {
            return JWT.sign({
                iss: 'turlell',
                sub: this.id,
                iat: new Date().getTime(), // current time
                exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
            }, SECRET);
        }

        save() {
            if (this.id) {
                return db.query(
                    "UPDATE User SET email = ?, password = ? WHERE id = ?;",
                    [this.email, this.password, this.id]
                );
            }
            return db.query(
                "INSERT INTO User (email, password) VALUES (? ,?)", [this.email, this.password]
            ).then(([ResultSetHeader]) => {
                console.log(ResultSetHeader);
                this.id = ResultSetHeader.insertId;
                console.log(this);
                return;
            });
        }

        static getUserById(userId) {
            return db.query(
                "SELECT * FROM User WHERE id = ?", [userId]
            );
        }

        static getUsers() {
            return db.query(
                "SELECT * FROM User"
            );
        }
    }