const bcrypt = require('bcrypt');

const User = require('../models/user');

const saltRounds = 10;

const signUp = async (req, res, next) => {
    bcrypt.hash(req.value.body.password, saltRounds).then(passwordHash => {
        const user = new User(req.value.body.email, passwordHash);
        return user.save().then(() => {
            res.status(200).json({
                token: user.newToken()
            });
        });
    }).catch(err => console.log(err));
};

const getSuperSecret = (req, res, next) => {
    console.log(req.user);
    res.render('secretPage', {
        user: req.user
    });
};

exports.signUp = signUp;
exports.getSuperSecret = getSuperSecret;