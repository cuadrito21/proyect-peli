const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /actors you must bring all the actors', async() => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /actors you must create an actor', async() => {
    const createActors = {
        firstName: "Ejemplo",
        lastName: "Ejemplo",
        nationality: "undefined",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/33d71d103340495.Y3JvcCwxMzY0LDEwNjcsMzg0LDA.png",
        birthday: "2023"
    }
    const res = await request(app).post('/actors').send(createActors);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(createActors.firstName);
});

test('PUT /actors/:id must update an actor', async() => {
    const actualizateActor = {
        firstName: "newAcotor"
    }
    const res = await request(app).put(`/actors/${id}`).send(actualizateActor);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(actualizateActor.firstName);
});

test('DELETE /actors/:id must remove an actor', async() => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204);
});