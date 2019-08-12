const JWT = require('jsonwebtoken');
<<<<<<< Updated upstream
const { SECRET } = require('../configuration/configuration')
const bcrypt = require('bcrypt');
=======

const db = require('../util/database');
const {
    SECRET
} = require('../configuration/configuration')
>>>>>>> Stashed changes

const saltRounds = 10;
const users = [];

<<<<<<< Updated upstream
module.exports = 
class User
{
    constructor(email, passwordHash)
    {
        this.id = Date.now();
        this.email = email;
        this.password = passwordHash;
        this.token = this.newToken(this);
        users.push(this);
        console.log(this);
    }

    static async createUser(email, password) 
    {
       const hash = await bcrypt.hash(password, saltRounds);
       return new User(email, hash);
    }
=======
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
>>>>>>> Stashed changes

    newToken(user)
    {
        return JWT.sign({
            iss: 'turlell',
            sub: user.id,
            iat: new Date().getTime(), // current time
            exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
          }, SECRET);
    }

    static getUsers() { return users; }
}
