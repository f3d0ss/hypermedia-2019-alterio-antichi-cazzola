const User = require('../models/user')

const signUp = async (req, res, next) => res.status(200).json({
    token: (await User.createUser(req.value.body.email, req.value.body.password)).token
});

const getSuperSecret = (req, res, next) => {
    res.render('secretPage', {
        user: req.user
    });
};

exports.signUp = signUp;
exports.getSuperSecret = getSuperSecret;