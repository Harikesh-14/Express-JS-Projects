const express = require('express');
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose')
const teachersRegister = require('../db/teachersDetails')

require('../db/conn')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/signIn.html'));
});

router.post('/', async (req, res) => {
    try{
        const usernameS = req.body.signInEmail;
        const passwordS = req.body.signInPassword;

        // fetching the details from the database. Here teachersRegister is the name of the file which we have imported. This imported file is the creating the schema of the database
        const userDetails = await teachersRegister.findOne({ emailID: usernameS, password: passwordS})

        if(userDetails){
            // we can directly access the table values. It is not mandatory to be specified in the userDetails block
            const firstName = userDetails.firstName;
            const teacherID = userDetails.teacherID;
            // res.send(`Welcome ${firstName}! You are from ${location}`);
            res.render('dashboard', {firstName, teacherID}) // don't use forward slash
        } else{
            res.send(`Login Failed`)
        }
    } catch(err){
        console.log(`An error occurred: ${err}`)
    }
})

router.get('/register-user', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/signUp.html'));
});

router.post('/register-user', async (req, res) => {
    try {
        const teacherSignUp = new teachersRegister({
            firstName: req.body.signUpFirstName,
            lastName: req.body.signUpLastName,
            emailID: req.body.signUpEmail,
            teacherID: req.body.signUpTeacherID,
            phoneNumber: req.body.signUpPhone,
            dateOfBirth: req.body.signUpDOB,
            gender: req.body.signUpGender,
            location: req.body.signUpStates,
            password: req.body.signUpPassword,
        });

        const teacherRegistered = await teacherSignUp.save();
        res.sendFile(path.join(__dirname, '../public/html/signUp.html'));
    } catch (err) {
        console.log("An error occurred " + err);
    }
});

module.exports = router;