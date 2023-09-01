const LocalStrategy = require('passport-local').Strategy
const { User } = require('./db/userDetails')

exports.initializePassport = (passport) => {
    passport.use(new LocalStrategy(async (username, password, done) => {
        const user = await User.findOne({ username })

        try {
            if (!user) {
                return done(null, false)
            }

            if (user.password !== password) {
                return done(null, false)
            }
            return done(null, user)
        } catch (err) {
            console.log(err)
            return done(error, false)
        }
    }))
}