import request from 'supertest';
import app from '../../../app';

let token = '';

describe('GET /api/v1/movies/:id', () => {
  const timestamp = Date.now();

  const userData = {
    "email": `test-${timestamp}@gmail.com`,
    "name": "Ivan",
    "password": "12345678",
    "confirmPassword": "12345678"
  };

  beforeAll(async () => {
    const createUserRes = await request(app)
      .post('/api/v1/users')
      .send(userData);
    token = createUserRes.body.token;
  })

  it('should not show a movie without id', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: 'DVD',
      actors: [],
    };
    const responseCreate = await request(app)
      .post('/api/v1/movies')
      .send(movieData);

    expect(responseCreate.status).toBe(200);

    const responseMovie = await request(app)
      .get(`/api/v1/movies/undefined`)
      .set('Authorization', `${token}`)

    expect(responseMovie.status).toBe(400);
  });
  it('should show a movie successfully', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: 'DVD',
      actors: [
        'Humphrey Bogart',
      ]
    };
    const createResponse = await request(app)
      .post('/api/v1/movies')
      .send(movieData);

    expect(createResponse.status).toBe(200);

    const responseMovie = await request(app)
      .get(`/api/v1/movies/${createResponse.body.data.id}`)
      .set('Authorization', `${token}`)

    expect(responseMovie.status).toBe(200);
    expect(responseMovie.body.status).toBe(1);
    expect(responseMovie.body.data.title).toBe(movieData.title);
    expect(responseMovie.body.data.year).toBe(movieData.year);
    expect(responseMovie.body.data.format).toBe(movieData.format);
    expect(responseMovie.body.data.actors[0].name).toBe(movieData.actors[0]);
    expect(responseMovie.body.data.createdAt).toBeDefined();
    expect(responseMovie.body.data.updatedAt).toBeDefined();
  });
});
