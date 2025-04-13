import request from 'supertest';
import app from '../../../app';

describe('GET /api/v1/movies/:id', () => {
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
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData);

    expect(response.status).toBe(200);

    const responseMovie = await request(app)
      .get(`/api/v1/movies/${response.body.data.id}`)

    expect(responseMovie.status).toBe(200);
    expect(responseMovie.body.status).toBe(1);
    expect(response.body.data.title).toBe(movieData.title);
    expect(response.body.data.year).toBe(movieData.year);
    expect(response.body.data.format).toBe(movieData.format);
    expect(response.body.data.actors[0].name).toBe(movieData.actors[0]);
    expect(response.body.data.createdAt).toBeDefined();
    expect(response.body.data.updatedAt).toBeDefined();
  });
});
