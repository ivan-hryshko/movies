import request from 'supertest'
import app from '../../../app'
import { testHelper } from '../../../utils/testHelper'

describe('GET /api/v1/movies/:id', () => {
  beforeAll(async () => {
    await testHelper.prepare()
    await testHelper.generateTokenAndUser()
  })

  it('should not show a movie with invalid id', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: 'DVD',
      actors: [],
    }
    const responseCreate = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(responseCreate.status).toBe(200)

    const responseMovie = await request(app)
      .get(`/api/v1/movies/undefined`)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(responseMovie.status).toBe(400)
  })
  it('should not show a movie with not exist id', async () => {
    const showRest = await request(app)
      .get(`/api/v1/movies/99999`)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(showRest.status).toBe(400)
    expect(showRest.body.message).toContain('Movie not found')
  })
  it('should show a movie successfully', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: 'DVD',
      actors: [
        'Humphrey Bogart',
      ]
    }
    const createResponse = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(createResponse.status).toBe(200)

    const responseMovie = await request(app)
      .get(`/api/v1/movies/${createResponse.body.data.id}`)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(responseMovie.status).toBe(200)
    expect(responseMovie.body.status).toBe(1)
    expect(responseMovie.body.data.title).toBe(movieData.title)
    expect(responseMovie.body.data.year).toBe(movieData.year)
    expect(responseMovie.body.data.format).toBe(movieData.format)
    expect(responseMovie.body.data.actors[0].name).toBe(movieData.actors[0])
    expect(responseMovie.body.data.createdAt).toBeDefined()
    expect(responseMovie.body.data.updatedAt).toBeDefined()
  })
})
