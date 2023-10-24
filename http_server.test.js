const supertest = require('supertest');
const app = require('./http_server');
const request = supertest(app);
const faker = require('faker');

// Generate random user data using faker.js
function user() {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const date = faker.date.past(50);

    const name = faker.name.findName(firstName, lastName);
    const email = faker.internet.email(firstName, lastName);
    const username = faker.internet.userName(firstName, lastName);
    const password = faker.internet.password();
    const phone = faker.phone.phoneNumber();
    const streetAddress = faker.address.streetAddress();
    const cityStateZip =
        faker.address.city() +
        ", " +
        faker.address.stateAbbr() +
        " " +
        faker.address.zipCode();
    const latitude = faker.address.latitude();
    const longitude = faker.address.longitude();
    const dob =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate();

    // Create user object
    return {
        name,
        dob,
        email,
        username,
        password,
        phone,
        streetAddress,
        cityStateZip,
        latitude,
        longitude,
    };
}

// create test users
const user1 = user();
const user2 = user();
const user3 = user();

it('populate data', async () => {
    await request.post('/add').send(user1);
    await request.post('/add').send(user2);
    await request.post('/add').send(user3);
});
it('verify data', async () => {
    const data = await request.get('/data');

    expect(data.body.some(e => e.name === user1.name)).toBeTruthy();
    expect(data.body.some(e => e.name === user2.name)).toBeTruthy();
    expect(data.body.some(e => e.name === user3.name)).toBeTruthy();
});

let server;

beforeAll(async () => {
    server = app.listen(3000, () => {
        console.log('Running on port 3000');
    });
});

afterAll(async () => {
    server.close(() => {
        console.log('Server closed');
    });
});
