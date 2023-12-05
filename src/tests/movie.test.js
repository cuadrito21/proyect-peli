const request = require('supertest');
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');
require('../models');

let id;

test('GET /movies you must bring all the movies', async() => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies you must create an movie', async() => {
    const createMovie = {
        name: "Ejemplo",
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/33d71d103340495.Y3JvcCwxMzY0LDEwNjcsMzg0LDA.png",
        synopsis: "Ejemplo Texto",
        releaseYear: "2023"
    }
    const res = await request(app).post('/movies').send(createMovie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(createMovie.name);
});

test('PUT /movies/:id must update an movie', async() => {
    const actualizateMovie = {
        name: "newGenre"
    }
    const res = await request(app).put(`/movies/${id}`).send(actualizateMovie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actualizateMovie.name);
});

// Prueba POST /movies/:id/actors
test('POST /movies/:id/actors should add an actor to a movie', async () => {
    const actor = await Actors.create({ 
        firstName:"Anonimo", 
        lastName: "Anonimo", 
        nationality: "Anonima", 
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/33d71d103340495.Y3JvcCwxMzY0LDEwNjcsMzg0LDA.png", 
        birthday: "2023"
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

// Prueba POST /movies/:id/directors
test('POST /movies/:id/directors should add an director to a movie', async () => {
    const director = await Directors.create({ 
        firstName:"Anonimo", 
        lastName: "Anonimo", 
        nationality: "Anonima", 
        image: "https://mir-s3-cdn-cf.behance.net/projects/404/33d71d103340495.Y3JvcCwxMzY0LDEwNjcsMzg0LDA.png", 
        birthday: "2023"
    });
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

// Prueba POST /movies/:id/genres
test('POST /movies/:id/genres should add an genre to a movie', async () => {
    const genre = await Genres.create({ 
        name: "Ejemplo"
    });
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});
  
test('DELETE /movies/:id must remove an movie', async() => {
    const res = await request(app).delete(`/movies/${id}`)
    expect(res.status).toBe(204);
});