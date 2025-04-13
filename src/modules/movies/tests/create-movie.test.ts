import request from 'supertest';
import app from '../../../app';

describe('POST /api/v1/movies', () => {
  it('should create a movie with emty actors', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: 'DVD',
      actors: [],
    };
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData);

    expect(response.status).toBe(200);
    expect(response.body.data.title).toBe(movieData.title);
    expect(response.body.data.year).toBe(movieData.year);
    expect(response.body.data.format).toBe(movieData.format);
    expect(response.body.data.actors).toHaveLength(0);
    expect(response.body.status).toBe(1);
    expect(response.body.data.createdAt).toBeDefined();
    expect(response.body.data.updatedAt).toBeDefined();
  });
  it('should create a movie successfully', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: 'DVD',
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
      ]
    };
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe(1);
    expect(response.body.data.title).toBe(movieData.title);
    expect(response.body.data.year).toBe(movieData.year);
    expect(response.body.data.format).toBe(movieData.format);
    expect(response.body.data.actors).toHaveLength(movieData.actors.length);
    expect(response.body.data.actors[0].name).toBe(movieData.actors[0]);
    expect(response.body.data.actors[1].name).toBe(movieData.actors[1]);
    expect(response.body.data.actors[0].id).toBeDefined();
    expect(response.body.data.actors[0].createdAt).toBeDefined();
    expect(response.body.data.actors[0].updatedAt).toBeDefined();
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
      .post('/api/v1/movies')
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
      .post('/api/v1/movies')
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
      .post('/api/v1/movies')
      .send(movieData);
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0].path).toBe('format');
  });
  it('should not create a movie with wrong format', async () => {
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
      .post('/api/v1/movies')
      .send(movieData);
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0].path).toBe('format');
    expect(response.body.errors[0].msg).toContain('Format must be one')
  });
  it('should not create a movie without actors', async () => {
    const movieData = {
      title : 'Casablanca',
      year: 1942,
      format: 'DVD',
    };
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData);
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0].path).toBe('actors');
  });
});
