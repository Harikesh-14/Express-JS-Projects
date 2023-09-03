const express = require('express');
const path = require('path');
const app = express();
const expressSession = require('express-session')
const teacherDetail = require('./db/userDetails');
const passport = require('passport');
const { initializePassport, isAuthenticated } = require('./passportConfig');
require('./db/conn');

const port = 3000;

// setting up express-session
app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}))

initializePassport(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// for public folder
app.use(express.static(path.join(__dirname, 'public')));


// for ejs file
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'signIn.html'));
});

app.post('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout(); // Log out the current user
        console.log('User logged out');
    }
    passport.authenticate("local", {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

app.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const { firstName, lastName, emailID, phoneNumber, teacherID, location, gender } = req.user;
        console.log('User profile retrieved:', req.user);
        res.render('dashboard', { firstName, teacherID, lastName, emailID, phoneNumber, location, gender });
    } catch (err) {
        console.log(`An error occurred: ${err}`);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.redirect('/');
    });
});


app.listen(port, () => {
    console.log(`Your server is running at port: ${port}`);
});