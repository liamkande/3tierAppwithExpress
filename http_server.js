const express = require('express');
const app = express();
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const adapter = new fs('db.json');
const db = low(adapter);
const cors = require('cors');
// const { faker } = require('@faker-js/faker');

// Allow cross-origin resource sharing (CORS)
app.use(cors());

// Data parser - used to parse post data
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Initialize the data store
db.defaults({ users: [] }).write();

// Define the port
const port = process.env.PORT || 3001;

// Return all users
app.get('/data', function (req, res) {
    res.send(db.get('users').value());
});

// Add user
app.post('/add', function (req, res) {
    const user = {
        'name': req.body.name,
        'dob': req.body.dob,
        'email': req.body.email,
        'username': req.body.username,
        'password': req.body.password,
        'phone': req.body.phone,
        'latitude': req.body.latitude,
        'longitude': req.body.longitude,
        // Removed 'avatar': faker.internet.avatar()
    };
    db.get('users').push(user).write();
    console.log(db.get('users').value());
    res.send(db.get('users').value());
});

// Start the server
app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;