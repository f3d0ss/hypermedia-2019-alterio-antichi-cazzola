const bcrypt = require('bcrypt');

const User = require('../../../models/user');
const {
    SALT_ROUND
} = require('../../../configuration/configuration');

exports.postSignup = async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    try {
        const passwordHash = await bcrypt.hash(password, SALT_ROUND);
        const user = new User(email, passwordHash);
        await user.save();
        res.status(201).json({
            token: user.newToken()
        });
    } catch (error) {
        next(error);
    }
}

exports.postLogin = async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    try {
        const user = await User.getUserByEmail(email);
        if (!user) {
            const error = new Error();
            error.status = 404;
            error.message = "Email not found";
            return next(error);
        }

        if (!(await bcrypt.compareSync(password, user.password))) {
            const error = new Error();
            error.status = 401;
            error.message = "Wrong password";
            return next(error);
        }
        res.status(200).json({
            token: user.newToken()
        });
    } catch (error) {
        next(error);
    }
}