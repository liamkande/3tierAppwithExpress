const express = require('express');
const low = require('lowdb');
const fs = require('lowdb/adapters/FileSync');
const bodyParser = require('body-parser');
const faker = require('faker'); // Import Faker.js

const adapter = new fs('db.json');
const db = low(adapter);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.defaults({ users: [] }).write();

app.get('/data', function(req, res) {
    res.send(db.get('users').value());
});

app.post('/test', function(req, res) {
    console.log(req.body.username, req.body.password);
    res.send(req.body.username + ' ' + req.body.password);
});

app.post('/add', function(req, res) {
    const user = {
        name: req.body.name || faker.name.findName(),
        dob: req.body.dob || faker.date.past().toISOString(),
        email: req.body.email || faker.internet.email(),
        username: req.body.username || faker.internet.userName(),
        password: req.body.password || faker.internet.password(),
        phone: req.body.phone || faker.phone.phoneNumber(),
        streetaddress: req.body.streetaddress || faker.address.streetAddress(),
        citystatezip: req.body.citystatezip || faker.address.city() + ', ' + faker.address.stateAbbr() + ' ' + faker.address.zipCode(),
        latitude: req.body.latitude || faker.address.latitude(),
        longitude: req.body.longitude || faker.address.longitude()
    };

    try {
        db.get('users').push(user).write();
        console.log(db.get('users').value());
        res.send(db.get('users').value());
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Error adding user');
    }
});

app.listen(PORT, function() {
    console.log(`Running on port ${PORT}`);
});
