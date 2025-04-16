import request from 'supertest'
import app from '../../../app'
import { MoviesTestHelper } from './movies-test-helper'

let createRes: any = {}
let createRes2: any = {}
const movieData = {
  title: 'Casablanca',
  year: 1942,
  format: 'DVD',
  actors: [
    'Humphrey Bogart',
  ]
}
const movieData2 = {
  title: 'Blazing Saddles',
  year: 1942,
  format: 'DVD',
  actors: [
    'Humphrey Bogart',
  ]
}

describe('GET /api/v1/movies/', () => {
  beforeAll(async () => {
    await MoviesTestHelper.prepare()
    await MoviesTestHelper.generateTokenAndUser()
    await MoviesTestHelper.deleteAllMovies()

    createRes = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${MoviesTestHelper.getToken()}`)

    expect(createRes.status).toBe(200)

    createRes2 = await request(app)
      .post('/api/v1/movies')
      .send(movieData2)
      .set('Authorization', `${MoviesTestHelper.getToken()}`)

    await request(app)
      .post('/api/v1/movies')
      .send({
          title: 'bblazing Saddles',
          year: 1942,
          format: 'DVD',
          actors: []
      })
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
    await request(app)
      .post('/api/v1/movies')
      .send({
          title: 'Їжак',
          year: 1942,
          format: 'DVD',
          actors: []
      })
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
    await request(app)
      .post('/api/v1/movies')
      .send({
          title: 'їжак',
          year: 1942,
          format: 'DVD',
          actors: []
      })
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
    await request(app)
      .post('/api/v1/movies')
      .send({
          title: 'Яблуко',
          year: 1942,
          format: 'DVD',
          actors: []
      })
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
    await request(app)
      .post('/api/v1/movies')
      .send({
          title: 'яблуко',
          year: 1942,
          format: 'DVD',
          actors: []
      })
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
    await request(app)
      .post('/api/v1/movies')
      .send({
          title: 'марвел',
          year: 1942,
          format: 'DVD',
          actors: []
      })
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
    await request(app)
      .post('/api/v1/movies')
      .send({
          title: 'амнезія',
          year: 1942,
          format: 'DVD',
          actors: []
      })
      .set('Authorization', `${MoviesTestHelper.getToken()}`)

    expect(createRes.status).toBe(200)
  })
  it('should list a movie successfully with title', async () => {
    const query = {
      title: 'Casablanca',
    }

    const listRes = await request(app)
      .get(`/api/v1/movies`)
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
      .query(query)

    expect(listRes.status).toBe(200)
    expect(listRes.body.status).toBe(1)
    expect(Array.isArray(listRes.body.data)).toBe(true)

    expect(listRes.body.meta).toBeDefined()
    expect(listRes.body.meta.total).toBeDefined()
    expect(listRes.body.meta.total).toBe(1)

    expect(listRes.body.data[0].title).toBe(movieData.title)
    expect(listRes.body.data[0].title_lower).not.toBeDefined()
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
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
      .query(query)

    expect(listRes.status).toBe(200)
    expect(listRes.body.status).toBe(1)
    expect(Array.isArray(listRes.body.data)).toBe(true)

    expect(listRes.body.meta).toBeDefined()
    expect(listRes.body.meta.total).toBeDefined()
    expect(listRes.body.meta.total).toBe(2)

    expect(listRes.body.data[0].title).toBe(movieData.title)
    expect(listRes.body.data[0].title_lower).not.toBeDefined()
    expect(listRes.body.data[0].year).toBe(movieData.year)
    expect(listRes.body.data[0].format).toBe(movieData.format)
    expect(listRes.body.data[0].actors).not.toBeDefined()
    expect(listRes.body.data[0].createdAt).toBeDefined()
    expect(listRes.body.data[0].updatedAt).toBeDefined()
  })
  // it('should list a movie successfully with search by title', async () => {
  //   const query = {
  //     search: 'Casablanca',
  //   }

  //   const listRes = await request(app)
  //     .get(`/api/v1/movies`)
  //     .set('Authorization', `${MoviesTestHelper.getToken()}`)
  //     .query(query)

  //   expect(listRes.status).toBe(200)
  //   expect(listRes.body.status).toBe(1)
  //   expect(Array.isArray(listRes.body.data)).toBe(true)

  //   expect(listRes.body.meta).toBeDefined()
  //   expect(listRes.body.meta.total).toBeDefined()
  //   expect(listRes.body.meta.total).toBe(2)

  //   expect(listRes.body.data[0].title).toBe(movieData2.title)
  //   expect(listRes.body.data[0].year).toBe(movieData2.year)
  //   expect(listRes.body.data[0].format).toBe(movieData2.format)
  //   expect(listRes.body.data[0].actors).not.toBeDefined()
  //   expect(listRes.body.data[0].createdAt).toBeDefined()
  //   expect(listRes.body.data[0].updatedAt).toBeDefined()
  // })
  // it('should list a movie successfully with search by actor', async () => {
  //   const query = {
  //     search: 'Humphrey Bogart',
  //   }

  //   const listRes = await request(app)
  //     .get(`/api/v1/movies`)
  //     .set('Authorization', `${MoviesTestHelper.getToken()}`)
  //     .query(query)

  //   expect(listRes.status).toBe(200)
  //   expect(listRes.body.status).toBe(1)
  //   expect(Array.isArray(listRes.body.data)).toBe(true)

  //   expect(listRes.body.meta).toBeDefined()
  //   expect(listRes.body.meta.total).toBeDefined()
  //   expect(listRes.body.meta.total).toBe(1)

  //   expect(listRes.body.data[0].title).toBe(movieData.title)
  //   expect(listRes.body.data[0].year).toBe(movieData.year)
  //   expect(listRes.body.data[0].format).toBe(movieData.format)
  //   expect(listRes.body.data[0].actors).not.toBeDefined()
  //   expect(listRes.body.data[0].createdAt).toBeDefined()
  //   expect(listRes.body.data[0].updatedAt).toBeDefined()
  // })
  it('should list a movie successfully sort by title', async () => {
    const query = {
      sort: 'title',
    }

    const listRes = await request(app)
      .get(`/api/v1/movies`)
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
      .query(query)
    expect(listRes.status).toBe(200)
    expect(listRes.body.status).toBe(1)
    expect(Array.isArray(listRes.body.data)).toBe(true)

    expect(listRes.body.meta).toBeDefined()
    expect(listRes.body.meta.total).toBeDefined()
    expect(listRes.body.meta.total).toBe(9)

    expect(listRes.body.data[0].title).toContain('bblazing Saddles')
    expect(listRes.body.data[0].title_lower).not.toBeDefined()
    expect(listRes.body.data[1].title).toContain('Blazing Saddles')
    expect(listRes.body.data[2].title).toContain('Casablanca')
    expect(listRes.body.data[3].title).toContain('амнезія')
  })
  it('should list a movie with correct sort', async () => {
    const query = {
      sort: 'id'
    }

    const listRes = await request(app)
      .get(`/api/v1/movies`)
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
      .query(query)
    expect(listRes.status).toBe(200)
    expect(listRes.body.status).toBe(1)
    expect(listRes.body.meta.total).toBe(9)
  })
  it('should list a movie with correct sort', async () => {
    const query = {
      sort: 'year'
    }

    const listRes = await request(app)
      .get(`/api/v1/movies`)
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
      .query(query)
    expect(listRes.status).toBe(200)
    expect(listRes.body.status).toBe(1)
    expect(listRes.body.meta.total).toBe(9)
  })
  it('should not list a movie with incorrect sort', async () => {
    const query = {
      sort: 'wrong sort'
    }

    const listRes = await request(app)
      .get(`/api/v1/movies`)
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
      .query(query)
    expect(listRes.status).toBe(400)
  })
  it('should not list a movie with incorrect order', async () => {
    const query = {
      order: 'adasd',
    }

    const listRes = await request(app)
      .get(`/api/v1/movies`)
      .set('Authorization', `${MoviesTestHelper.getToken()}`)
      .query(query)
    expect(listRes.status).toBe(400)
  })
})
