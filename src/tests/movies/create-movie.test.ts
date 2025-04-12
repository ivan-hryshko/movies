import request from 'supertest';
import app from '../../app';

describe('POST /api/v1/movies/create', () => {
  it('should create a movie successfully', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: 'DVD',
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Claude Rains',
        'Peter Lorre'
      ]
    };
    const response = await request(app)
      .post('/api/v1/movies/create')
      .send(movieData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Movie created successfully');
    expect(response.body).toHaveProperty('data');
  });
});
