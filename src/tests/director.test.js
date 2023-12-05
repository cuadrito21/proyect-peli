const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /directors you must bring all the directors', async() => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors you must create an director', async() => {
    const createDirector = {
        firstName: "Ejemplo",
        lastName: "Ejemplo",
        nationality: "undefined",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/33d71d103340495.Y3JvcCwxMzY0LDEwNjcsMzg0LDA.png",
        birthday: "2023"
    }
    const res = await request(app).post('/directors').send(createDirector);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(createDirector.firstName);
});

test('PUT /directors/:id must update an director', async() => {
    const actualizateDirectors = {
        firstName: "newDirectors"
    }
    const res = await request(app).put(`/directors/${id}`).send(actualizateDirectors);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actualizateDirectors.firstName);
});

test('DELETE /directors/:id must remove an director', async() => {
    const res = await request(app).delete(`/directors/${id}`)
    expect(res.status).toBe(204);
});