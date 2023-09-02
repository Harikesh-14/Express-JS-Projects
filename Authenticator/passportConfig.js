const LocalStrategy = require('passport-local').Strategy;
const { User } = require('./db/userDetails');

exports.initializePassport = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: "signInEmail",
        passwordField: "signInPassword"
    }, async (username, password, done) => {
        const user = await User.findOne({ username });

        try {
            if (!user) {
                return done(null, false);
            }

            if (user.password !== password) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            console.log(err);
            return done(err, false);
        }
    }));

    // mandatory step serializing and deserializing the user

    // serializing means to save the user id until user logouts
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // deserializing means to remove the user from the session after user logouts
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);  // Use findById instead of findByID
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    });
};
