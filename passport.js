const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { SECRET } = require('./configuration/configuration');
const User = require('./models/user');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy(
{
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: SECRET
}, async (payload, done) => 
{
    try 
    {
        // Find the user specified in token
        const user = User.getUsers().find(tmpUser => tmpUser.id === payload.sub);
        return done(null, user != null ? user: false);
    } catch(error) 
    {
        done(error, false);
    }
}));