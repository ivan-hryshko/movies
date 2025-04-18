import request from 'supertest'
import app from '../../../app'
import jwt from 'jsonwebtoken'
import ENV_VARIABLES from '../../../config/envs'
import { testHelper } from '../../../utils/testHelper'

describe('POST /api/v1/sessions', () => {
    beforeAll(async () => {
      await testHelper.prepare()
    })
  it('should create a session successfully', async () => {
    const userData = {
      "email": "session@gmail.com",
      "name": "Ivan",
      "password": "12345678",
      "confirmPassword": "12345678"
    }
    const response = await request(app)
      .post('/api/v1/users')
      .send(userData)
    expect(response.status).toBe(200)
    const sessionData = {
      "email": userData.email,
      "password": userData.password
    }
    const sessionResponse = await request(app)
      .post('/api/v1/sessions')
      .send(sessionData)
    expect(sessionResponse.status).toBe(200)
    expect(sessionResponse.body.status).toBe(1)
    expect(sessionResponse.body.token).toBeDefined()

    const decoded = jwt.verify(sessionResponse.body.token, ENV_VARIABLES.JWT_SECRET)

    expect(decoded).not.toHaveProperty('password')
    expect(decoded).toHaveProperty('email', userData.email)
    expect(decoded).toHaveProperty('name', userData.name)
  })
  it('should not create a session without email', async () => {
    const sessionData = {
      "password": "12345678",
    }
    const response = await request(app)
      .post('/api/v1/sessions')
      .send(sessionData)
    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].path).toBe('email')
  })
  it('should not create a session without passwod', async () => {
    const sessionData = {
      "email": "test@gmail.com",
    }
    const response = await request(app)
      .post('/api/v1/sessions')
      .send(sessionData)
    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].path).toBe('password')
  })
})
