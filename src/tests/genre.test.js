const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /genres you must bring all the agenres', async() => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /genres you must create an genre', async() => {
    const createGenre = {
        name: "Ejemplo"
    }
    const res = await request(app).post('/genres').send(createGenre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(createGenre.name);
});

test('PUT /genres/:id must update an genre', async() => {
    const actualizateGenre = {
        name: "newGenre"
    }
    const res = await request(app).put(`/genres/${id}`).send(actualizateGenre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actualizateGenre.name);
});

test('DELETE /genres/:id must remove an genre', async() => {
    const res = await request(app).delete(`/genres/${id}`)
    expect(res.status).toBe(204);
});