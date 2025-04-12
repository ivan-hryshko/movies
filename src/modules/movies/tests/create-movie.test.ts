import request from 'supertest';
import app from '../../../app';

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

  it('should not create a movie without title', async () => {
    const movieData = {
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
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0].path).toBe('title');
  });
  it('should not create a movie without year', async () => {
    const movieData = {
      title : 'Casablanca',
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
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0].path).toBe('year');
  });
  it('should not create a movie without format', async () => {
    const movieData = {
      title : 'Casablanca',
      year: 1942,
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
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0].path).toBe('format');
  });
  it('should not create a movie with wring format', async () => {
    const movieData = {
      title : 'Casablanca',
      format: 'mp3',
      year: 1942,
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
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0].path).toBe('format');
    expect(response.body.errors[0].msg).toContain('Format must be one')
  });
});
