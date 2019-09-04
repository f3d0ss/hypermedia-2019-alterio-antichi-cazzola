const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {
    ExtractJwt
} = require('passport-jwt');
const {
    SECRET
} = require('./configuration/configuration');
const User = require('./models/user');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
}, async (payload, done) => {

    // Find the user specified in token
    try {
        const user = await User.getUserById(payload.sub);
        if (user) {
            return done(null, user);
        } else {
            const err = new Error();
            err.status = 401;
            throw err;
        }
    } catch (err) {
        console.log(err);
        done(err, false);
    };
}));