const JWT = require('jsonwebtoken');
const { SECRET } = require('../configuration/configuration')
const bcrypt = require('bcrypt');

const saltRounds = 10;
const users = [];

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
