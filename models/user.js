const JWT = require('jsonwebtoken');
const { SECRET } = require('../configuration/configuration')

const users = [];

module.exports = 
class
{
    constructor(email, password)
    {
        this.id = Date.now();
        this.email = email;
        this.password = password;
        this.token = this.newToken(this);
        users.push(this); // db replacement
    }

    newToken(user)
    {
        return JWT.sign({
            iss: 'CodeWorkr',
            sub: user.id,
            iat: new Date().getTime(), // current time
            exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
          }, SECRET);
    }

    static getUsers() { return users; }
}
