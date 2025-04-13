import request from 'supertest';
import app from '../../../app';

describe('POST /api/v1/sessions', () => {
  it('should create a session successfully', async () => {
    const userData = {
      "email": "test@gmail.com",
      "name": "Ivan",
      "password": "12345678",
      "confirmPassword": "12345678"
    };
    const response = await request(app)
      .post('/api/v1/users')
      .send(userData);
    expect(response.status).toBe(200);
    const sessionData = {
      "email": userData.email,
      "password": userData.password
    };
    const sessionResponse = await request(app)
      .post('/api/v1/sessions')
      .send(sessionData);
    expect(sessionResponse.status).toBe(200);
    expect(sessionResponse.body.status).toBe(1);
    expect(sessionResponse.body.token).toBeDefined();
  });
  it('should not create a session without email', async () => {
    const sessionData = {
      "password": "12345678",
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
    };
    const response = await request(app)
      .post('/api/v1/sessions')
      .send(sessionData);
    expect(response.status).toBe(400);
    expect(response.body.errors.length).toBeGreaterThan(0);
    expect(response.body.errors[0].path).toBe('password');
  });
});
