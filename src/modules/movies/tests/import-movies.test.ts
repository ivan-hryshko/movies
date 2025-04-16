import request from 'supertest'
import app from '../../../app'
import { testHelper } from '../../../utils/testHelper'
import path from 'path'

const moviesPath = path.join(__dirname, '../examples/movies.txt')
const brokenMoviesPath = path.join(__dirname, '../examples/broken-movies.txt')

describe('GET /api/v1/movies/', () => {
  beforeAll(async () => {
    await testHelper.prepare()
    await testHelper.generateTokenAndUser()
  })
  beforeEach(async () => {
    const listRes = await request(app)
    .get(`/api/v1/movies`)
    .set('Authorization', `${testHelper.getToken()}`)

    expect(listRes.status).toBe(200)
    const body = listRes.body
    const movieIds = body.data.map((item: any) => item.id)

    for (const id of movieIds) {
      await request(app)
        .delete(`/api/v1/movies/${id}`)
        .set('Authorization', `${testHelper.getToken()}`)
    }
  })
  it('should import a movies successfully', async () => {
    const importRes = await request(app)
      .post(`/api/v1/movies/import`)
      .set('Authorization', `${testHelper.getToken()}`)
      .attach('movies', moviesPath) // form field name is 'movies'

    expect(importRes.status).toBe(200)
    expect(importRes.body.status).toBe(1)
    expect(Array.isArray(importRes.body.data)).toBe(true)
    expect(importRes.body.meta).toBeDefined()
    expect(importRes.body.meta.total).toBeDefined()
    expect(importRes.body.meta.total).toBe(25)
    expect(importRes.body.meta.imported).toBe(25)
    expect(importRes.body.data[0].title).toBe('Blazing Saddles')
    expect(importRes.body.data[0].title_lower).not.toBeDefined()
    expect(importRes.body.data[0].year).toBe(1974)
    expect(importRes.body.data[0].format).toBe('VHS')
  })
  it('should import a broken movies list successfully', async () => {
    const importRes = await request(app)
      .post(`/api/v1/movies/import`)
      .set('Authorization', `${testHelper.getToken()}`)
      .attach('movies', brokenMoviesPath)

    expect(importRes.status).toBe(200)
    expect(importRes.body.status).toBe(1)
    expect(Array.isArray(importRes.body.data)).toBe(true)
    expect(importRes.body.meta).toBeDefined()
    expect(importRes.body.meta.total).toBeDefined()
    expect(importRes.body.meta.total).toBe(1)
    expect(importRes.body.meta.imported).toBe(5)
  })
})
