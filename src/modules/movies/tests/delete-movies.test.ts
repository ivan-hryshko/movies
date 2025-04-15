import request from 'supertest'
import app from '../../../app'
import { testHelper } from '../../../utils/testHelper'

describe('DELETE /api/v1/movies/:id', () => {
  beforeAll(async () => {
    await testHelper.prepare()
    await testHelper.generateTokenAndUser()
  })

  it('should not delete a movie without id', async () => {
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

    const responseDel = await request(app)
      .delete(`/api/v1/movies/undefined`)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(responseDel.status).toBe(400)
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
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(200)

    const responseDel = await request(app)
      .delete(`/api/v1/movies/${response.body.data.id}`)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(responseDel.status).toBe(200)
    expect(responseDel.body.status).toBe(1)
    expect(responseDel.body).toEqual({ status: 1 })
  })
})
