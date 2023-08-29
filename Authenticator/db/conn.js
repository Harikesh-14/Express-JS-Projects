const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

mongoose.connect("mongodb://127.0.0.1:27017/AttendanceManagement", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database")
}).catch((err) => {
    console.log(`An error occurred: ${err}`)
})