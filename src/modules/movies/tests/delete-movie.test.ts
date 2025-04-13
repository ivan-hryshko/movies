import request from 'supertest';
import app from '../../../app';

describe('DELETE /api/v1/movies/:id', () => {
  it('should not delete a movie without id', async () => {
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

    const responseDel = await request(app)
      .delete(`/api/v1/movies/undefined`)

    expect(responseDel.status).toBe(400);
  });
  it('should delte a movie successfully', async () => {
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

    const responseDel = await request(app)
      .delete(`/api/v1/movies/${response.body.data.id}`)

    expect(responseDel.status).toBe(200);
    expect(responseDel.body.status).toBe(1);
  });
});
