const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// To take all the json input
app.use(express.json())
// This line won't show any undefined value
app.use(express.urlencoded({ extended: false }))

// We have to use the concept of middleware for accessing the file
const circuitRouter = require('./Routes/circuit.js');
app.use('/', circuitRouter);

app.use(express.static(path.join(__dirname, 'public')));

// using views folder for using ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`Your server is running at port: ${port}`);
});
