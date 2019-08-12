const JWT = require('jsonwebtoken');

const db = require('../util/database');
const {
    SECRET
} = require('../configuration/configuration');


module.exports =
    class User {
        constructor(email, password, id) {
            this.id = id ? id : null;
            this.email = email;
            this.password = password;
        }

        newToken() {
            return JWT.sign({
                iss: 'turlell',
                sub: this.id,
                iat: new Date().getTime(), // current time
                exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
            }, SECRET);
        }


        async save() {
            if (this.id) {
                return db.query(
                    "UPDATE User SET email = ?, password = ? WHERE id = ?;",
                    [this.email, this.password, this.id]
                );
            }
            var ResultSetHeader = await db.query(
                "INSERT INTO User (email, password) VALUES (? ,?)",
                [this.email, this.password]
            );
            console.log(ResultSetHeader[0]);
            this.id = ResultSetHeader[0].insertId;
            console.log(this);
        }

        static async getUserById(userId) {
            return db.query(
                "SELECT * FROM User WHERE id = ?", [userId]
            );
        }

        static async getUsers() {
            return db.query(
                "SELECT * FROM User"
            );
        }
    }