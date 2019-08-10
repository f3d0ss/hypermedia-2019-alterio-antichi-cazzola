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
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: SECRET
}, async (payload, done) => {

    // Find the user specified in token
    const user = User.getUserById(payload.sub).then(([rows, fields]) => {
        console.log(payload.sub);
        console.log(rows);
        if (rows.length > 0) {
            const user = rows[0];
            return done(null, user != null ? user : false);
        } else {
            const err = new Error();
            throw err;
        }
    }).catch(err => {
        console.log(err);
        done(err, false);
    });
}));