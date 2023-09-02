const LocalStrategy = require('passport-local').Strategy;
const teacherDetail = require('./db/userDetails'); // Import the correct model

exports.initializePassport = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: "signInEmail",  // Use the correct field name for the email
        passwordField: "signInPassword"
    }, async (email, password, done) => { // Change 'username' to 'email'
        try {
            const user = await teacherDetail.findOne({ emailID: email }); // Use the correct field name

            if (!user) {
                return done(null, false);
            }

            if (user.password !== password) {
                return done(null, false);
            }

            return done(null, user);
        } catch (err) {
            console.error(err);
            return done(err, false);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await teacherDetail.findById(id);
            done(null, user);
        } catch (err) {
            done(err, false);
        }
    });
};
