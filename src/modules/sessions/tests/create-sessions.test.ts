import request from 'supertest';
import app from '../../../app';

describe('POST /api/v1/sessions', () => {
  it('should create a session successfully', async () => {
    const sessionData = {
      "email": "test@gmail.com",
      "name": "Ivan",
      "password": "12345678",
      "confirmPassword": "12345678"
    };
    const response = await request(app)
      .post('/api/v1/sessions')
      .send(sessionData);
    expect(response.status).toBe(200);
    expect(response.body.status).toBe(1);
    expect(response.body.token).toBeDefined();
  });
  it('should not create a session without email', async () => {
    const sessionData = {
      "name": "Ivan",
      "password": "12345678",
      "confirmPassword": "12345678"
    };
    const response = await request(app)
      .post('/api/v1/sessions')
      .send(sessionData);
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0].path).toBe('email');
  });
  it('should not create a session without passwod', async () => {
    const sessionData = {
      "email": "test@gmail.com",
      "name": "Ivan",
      "confirmPassword": "12345678"
    };
    const response = await request(app)
      .post('/api/v1/sessions')
      .send(sessionData);
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0].path).toBe('password');
  });
});
