const express = require('express');
const path = require('path');
const app = express();
const userRegister = require('./db/userDetails');
require('./db/conn');

const port = 3000;

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

app.post('/', async (req, res) => {
    try{
        const emailID = req.body.signInEmail
        const password = req.body.signInPassword
        const userFile = await userRegister.findOne({emailID, password})

        if(userFile){
            res.render('dashboard')
        } else{
            res.status(401).send("Invalid Username or Password")
        }
    } catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
})

app.listen(port, () => {
    console.log(`Your server is running at port: ${port}`);
});