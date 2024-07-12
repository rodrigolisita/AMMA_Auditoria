// index.test.js

const request = require('supertest');
const app = require('./index');

let server; // Store the server reference

beforeAll(() => {
    server = app.listen(3000); // Start the server before all tests
});

afterAll(() => {
    server.close(); // Close the server after all tests
});

describe('GET /', () => {
    it('responds with "Hello World from Node.js and Express!"', async () => {
        const res = await request(server).get('/'); // Use the server reference here
        expect(res.status).toBe(200);
        expect(res.text).toContain('Hello World from Node.js and Express!');
    });
});
