const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// create local strategy
const localOptions = { usernameField: 'email' } // use/map email ass username
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // verify email/password
    User.findOne({ email }, (err, user) => {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }
        // compare passwords - is password equal to user.password ?
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                return done(err);
            }
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        })
    })

})

// JWT strategy options
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret,
};

// create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    const { sub } = payload;
    // see if the user id in the payload exists in our database
    User.findById(sub, (err, user) => {
        if (err) {
            return done(err, false); // takes error and user
        }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }

    });

});

// tell passport to use strategy
passport.use(jwtLogin);
passport.use(localLogin);