const JWT = require('jsonwebtoken');

const db = require('../util/database');
const {
    SECRET
} = require('../configuration/configuration');


module.exports =
    class User {
        constructor(email, password, isVerified, id) {
            if (!id) {
                this.id = null;
                this.isVerified = 0;
            } else {
                this.id = id;
                this.isVerified = isVerified;
            }
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

        async setSignUpToken(signup_token) {
            await db.query(
                "INSERT INTO SignUpToken (user_id, signup_token) VALUES (?, ?)",
                [this.id, signup_token]
            );
        }

        async getSignUpToken() {
            const [rows] = await db.query(
                "SELECT signup_token FROM SignUpToken WHERE user_id = ?", [this.id]
            );
            return rows[0].signup_token;
        }

        async deleteSignUpToken() {
            return db.query(
                "DELETE FROM SignUpToken WHERE user_id = ?", [this.id]
            );
        }

        async save() {
            if (this.id) {
                return db.query(
                    "UPDATE User SET email = ?, password = ?, isVerified = ? WHERE id = ?;",
                    [this.email, this.password, this.isVerified, this.id]
                );
            }
            var ResultSetHeader = await db.query(
                "INSERT INTO User (email, password, isVerified) VALUES (? ,?, ?)",
                [this.email, this.password, this.isVerified]
            );
            console.log(ResultSetHeader[0]);
            this.id = ResultSetHeader[0].insertId;
            console.log(this);
        }

        static async getUserById(userId) {
            const [rows] = await db.query(
                "SELECT * FROM User WHERE id = ?", [userId]
            );
            if (rows.length === 0)
                return null;
            const user = rows[0];
            return new User(
                user.email,
                user.password,
                user.isVerified,
                user.id
            );
        }

        static async getUserByEmail(email) {
            const [rows] = await db.query(
                "SELECT * FROM User WHERE email = ?", [email]
            );
            if (rows.length === 0)
                return null;
            const user = rows[0];
            return new User(
                user.email,
                user.password,
                user.isVerified,
                user.id
            );
        }

        static async getUsers(pageNumber, pageSize) {
            const users = [];
            if (!pageNumber)
                pageNumber = 0;
            if (!pageSize)
                pageSize = 10;
            const startRow = pageNumber * pageSize;
            const [rows] = db.query(
                "SELECT * FROM User LIMIT ?,?", [startRow, startRow + +pageSize]
            );
            for (const userRow of rows) {
                users.push(new User(userRow.email, userRow.password, userRow.signUpToken, userRow.isVerified, userRow.id));
            }
        }
    }