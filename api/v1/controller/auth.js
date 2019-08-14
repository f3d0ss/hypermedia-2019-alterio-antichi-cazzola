const crypto = require('crypto');

const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../../../models/user');
const {
    SALT_ROUND,
    SENGRID_API_KEY
} = require('../../../configuration/configuration');

const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: SENGRID_API_KEY
        }
    })
);

exports.postSignup = async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    try {
        const passwordHash = await bcrypt.hash(password, SALT_ROUND);
        const user = new User(email, passwordHash);
        const token = (await crypto.randomBytes(32)).toString('hex');
        await user.save();
        user.setSignUpToken(token);
        transporter.sendMail({
            to: email,
            from: 'verify@festival-art.com',
            subject: 'Registration to FestivalArt',
            html: `
              <p>You're about to verify your email</p>
              <p>Click this <a href="http://localhost:3000/api/v1/auth/verify-email/${user.id}?token=${token}">link</a> to verify your email.</p>
            `
        });
        res.status(201).json({
            message: 'Verify your email'
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

        if (!user.isVerified) {
            const error = new Error();
            error.status = 403;
            error.message = "Verify your email";
            return next(error);
        }

        res.status(200).json({
            token: user.newToken()
        });
    } catch (error) {
        next(error);
    }
}

exports.getVerifyEmail = async (req, res, next) => {
    const userId = req.params.userId;
    const signUpToken = req.query.token;
    try {
        const user = await User.getUserById(userId);
        user.signUpToken = await user.getSignUpToken();
        if (user.isVerified) {
            const error = new Error();
            error.status = 409;
            error.message = "Already verified";
            return next(error);
        }
        if (user.signUpToken !== signUpToken) {
            const error = new Error();
            error.status = 401;
            error.message = "Wrong token";
            return next(error);
        }
        user.isVerified = true;
        await user.save();
        res.status(200).json({
            message: "Email Verified!"
        })
        user.deleteSignUpToken();
    } catch (error) {
        next(error);
    }


}