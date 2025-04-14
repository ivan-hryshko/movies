import request from 'supertest'
import app from '../../../app'
import { testHelper } from '../../../utils/testHelper'

let token = ''
let createRes: any = {}
const movieData = {
  title: 'Casablanca',
  year: 1942,
  format: 'DVD',
  actors: [
    'Humphrey Bogart',
  ]
}

describe('GET /api/v1/movies/', () => {
  beforeAll(async () => {
    token = await testHelper.generateTokenAndUser()
    createRes = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${token}`)

    expect(createRes.status).toBe(200)
  })

  // it('should not list a movie without id', async () => {
  //   const movieData = {
  //     title: 'Casablanca',
  //     year: 1942,
  //     format: 'DVD',
  //     actors: [],
  //   }
  //   const responseCreate = await request(app)
  //     .post('/api/v1/movies')
  //     .send(movieData)
  //     .set('Authorization', `${token}`)

  //   expect(responseCreate.status).toBe(200)

  //   const listRes = await request(app)
  //     .get(`/api/v1/movies/undefined`)
  //     .set('Authorization', `${token}`)

  //   expect(listRes.status).toBe(400)
  // })
  it('should list a movie successfully with title', async () => {
    const query = {
      title: 'Casablanca',
    }

    const listRes = await request(app)
      .get(`/api/v1/movies`)
      .set('Authorization', `${token}`)
      .query(query)

    expect(listRes.status).toBe(200)
    console.log('listRes.body :>> ', listRes.body);
    expect(listRes.body.status).toBe(1)
    expect(Array.isArray(listRes.body.data)).toBe(true)

    expect(listRes.body.meta).toBeDefined()
    expect(listRes.body.meta.total).toBeDefined()
    expect(listRes.body.meta.total).toBe(1)

    expect(listRes.body.data[0].title).toBe(movieData.title)
    expect(listRes.body.data[0].year).toBe(movieData.year)
    expect(listRes.body.data[0].format).toBe(movieData.format)
    expect(listRes.body.data[0].actors).not.toBeDefined()
    expect(listRes.body.data[0].createdAt).toBeDefined()
    expect(listRes.body.data[0].updatedAt).toBeDefined()
  })
  it('should list a movie successfully with actor', async () => {
    const query = {
      actor: 'Humphrey Bogart',
    }

    const listRes = await request(app)
      .get(`/api/v1/movies`)
      .set('Authorization', `${token}`)
      .query(query)

    expect(listRes.status).toBe(200)
    console.log('listRes.body :>> ', listRes.body);
    expect(listRes.body.status).toBe(1)
    expect(Array.isArray(listRes.body.data)).toBe(true)

    expect(listRes.body.meta).toBeDefined()
    expect(listRes.body.meta.total).toBeDefined()
    expect(listRes.body.meta.total).toBe(1)

    expect(listRes.body.data[0].title).toBe(movieData.title)
    expect(listRes.body.data[0].year).toBe(movieData.year)
    expect(listRes.body.data[0].format).toBe(movieData.format)
    expect(listRes.body.data[0].actors).not.toBeDefined()
    expect(listRes.body.data[0].createdAt).toBeDefined()
    expect(listRes.body.data[0].updatedAt).toBeDefined()
  })
})
