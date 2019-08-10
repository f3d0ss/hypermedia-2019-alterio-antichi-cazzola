const User = require('../models/user')

module.exports = 
{
    signUp: async (req, res, next) => res.status(200).json(
        { token: (await User.createUser(req.value.body.email, req.value.body.password)).token })
}