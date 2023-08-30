const express = require('express');
const path = require('path');
const app = express();
const userRegister = require('./db/userDetails');
require('./db/conn');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'signIn.html'));
});

app.listen(port, () => {
    console.log(`Your server is running at port: ${port}`);
});