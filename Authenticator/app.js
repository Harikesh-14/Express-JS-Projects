const express = require('express');
const path = require('path');
const app = express();
const expressSession = require('express-session')
const userRegister = require('./db/userDetails');
const passport = require('passport');
const { initializePassport } = require('./passportConfig');
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

app.post('/', passport.authenticate("local", {
    successRedirect: '/dashboard', // Redirect to the dashboard page on successful login
    failureRedirect: '/',         // Redirect back to the login page on failure
    failureFlash: true            // Enable flash messages for error handling (if you're using it)
}));

app.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
        res.render('dashboard');
    }
});

app.listen(port, () => {
    console.log(`Your server is running at port: ${port}`);
});