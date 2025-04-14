import request from 'supertest'
import app from '../../../app'
import { testHelper } from '../../../utils/testHelper'
import path from 'path'

let token = ''
const filePath = path.join(__dirname, '../examples/movies.txt')
console.log('filePath :>> ', filePath);

describe('GET /api/v1/movies/', () => {
  beforeAll(async () => {
    token = await testHelper.generateTokenAndUser()
  })
  it('should impor a movies successfully', async () => {
    const query = {
      title: 'Casablanca',
    }

    const importRes = await request(app)
      .post(`/api/v1/movies/import`)
      .set('Authorization', `${token}`)
      .attach('movies', filePath) // form field name is 'movies'

    expect(importRes.status).toBe(200)
    expect(importRes.body.status).toBe(1)
    expect(Array.isArray(importRes.body.data)).toBe(true)
    expect(importRes.body.meta).toBeDefined()
    expect(importRes.body.meta.total).toBeDefined()
    expect(importRes.body.meta.total).toBe(25)
    expect(importRes.body.data[0].title).toBe('Blazing Saddles')
    expect(importRes.body.data[0].year).toBe(1974)
    expect(importRes.body.data[0].format).toBe('VHS')

  })
})
