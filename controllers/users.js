const User = require('../models/user')

const signUp = async (req, res, next) => res.status(200).json({
    token: new User(req.value.body.email, req.value.body.password).token
});

const getSuperSicret = (req, res, next) => {
    res.render('secretPage');
};

exports.signUp = signUp;
exports.getSuperSicret = getSuperSicret;