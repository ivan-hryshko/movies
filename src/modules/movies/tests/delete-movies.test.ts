import request from 'supertest'
import app from '../../../app'
import { testHelper } from '../../../utils/testHelper'

describe('DELETE /api/v1/movies/:id', () => {
  beforeAll(async () => {
    await testHelper.prepare()
    await testHelper.generateTokenAndUser()
  })

  it('should not delete a movie with invalid id', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: 'DVD',
      actors: [],
    }
    const createRes = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(createRes.status).toBe(200)

    const deleteDes = await request(app)
      .delete(`/api/v1/movies/undefined`)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(deleteDes.status).toBe(400)
  })
  it('should delte a movie successfully', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: 'DVD',
      actors: [
        'Humphrey Bogart',
      ]
    }
    const createRes = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(createRes.status).toBe(200)
    const deleteDes = await request(app)
      .delete(`/api/v1/movies/${createRes.body.data.id}`)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(deleteDes.status).toBe(200)
    expect(deleteDes.body.status).toBe(1)
    expect(deleteDes.body).toEqual({ status: 1 })
  })
  it('should not delete a movie with not exist id', async () => {
    const deleteDes = await request(app)
      .delete(`/api/v1/movies/99999`)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(deleteDes.status).toBe(400)
    expect(deleteDes.body.message).toContain('Movie not found')
  })
})
