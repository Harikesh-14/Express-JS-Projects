const mongoose = require('mongoose')

const teacherDetailSchema = new mongoose.Schema({
    firstName: String,
    LastName: String,
    emailID: String,
    teacherID: String,
    phoneNumber: Number,
    dateOfBirth: Date,
    gender: String,
    location: String,
    password: String,
})

const teacherDetail = new mongoose.model("TeachersDetails", teacherDetailSchema)

module.exports = teacherDetail;