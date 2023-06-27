const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('./models/user')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({email: email});
        if(user==null){
            return done(null, false, {message: 'No user with that email'})
        }

        try{
            if(await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch(e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        passReqToCallback   : true
    },  function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
))

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((user, done) => done(null, user));
}

module.exports = initialize;