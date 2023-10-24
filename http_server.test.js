const supertest = require('supertest');
const app = require('./http_server');
const request = supertest(app);

it('Hello World!', (done) => {
    expect(1).toBe(1);
    done();
});

let server;

beforeAll((done) => {
    server = app.listen(3000, function() {
        console.log('Running on port 3000');
        done();
    });
});

afterAll((done) => {
    server.close(() => {
        console.log('Server closed');
        done();
    });
});
