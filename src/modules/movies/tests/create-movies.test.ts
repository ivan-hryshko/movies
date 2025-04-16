import request from 'supertest'
import app from '../../../app'
import { testHelper } from '../../../utils/testHelper'
import { MOVIE_FORMAT } from '../movies.constants'

describe('POST /api/v1/movies', () => {
  beforeAll(async () => {
    await testHelper.prepare()
    await testHelper.generateTokenAndUser()
  })

  it('should create a movie with emty actors', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: MOVIE_FORMAT.DVD,
      actors: [],
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(200)
    expect(response.body.data.title).toBe(movieData.title)
    expect(response.body.data.title_lower).not.toBeDefined()
    expect(response.body.data.year).toBe(movieData.year)
    expect(response.body.data.format).toBe(movieData.format)
    expect(response.body.data.actors).toHaveLength(0)
    expect(response.body.status).toBe(1)
    expect(response.body.data.createdAt).toBeDefined()
    expect(response.body.data.updatedAt).toBeDefined()
  })
  it('should create a movie successfully', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: MOVIE_FORMAT.DVD,
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(200)
    expect(response.body.status).toBe(1)
    expect(response.body.data.title).toBe(movieData.title)
    expect(response.body.data.year).toBe(movieData.year)
    expect(response.body.data.format).toBe(movieData.format)
    expect(response.body.data.actors).toHaveLength(movieData.actors.length)
    expect(response.body.data.actors[0].name).toBe(movieData.actors[0])
    expect(response.body.data.actors[1].name).toBe(movieData.actors[1])
    expect(response.body.data.actors[0].id).toBeDefined()
    expect(response.body.data.actors[0].createdAt).toBeDefined()
    expect(response.body.data.actors[0].updatedAt).toBeDefined()
  })
  it('should create a movie successfully with Blue-Ray', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: MOVIE_FORMAT.BLU_RAY,
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(200)
    expect(response.body.status).toBe(1)
    expect(response.body.data.title).toBe(movieData.title)
    expect(response.body.data.year).toBe(movieData.year)
    expect(response.body.data.format).toBe(movieData.format)
    expect(response.body.data.actors).toHaveLength(movieData.actors.length)
    expect(response.body.data.actors[0].name).toBe(movieData.actors[0])
    expect(response.body.data.actors[1].name).toBe(movieData.actors[1])
    expect(response.body.data.actors[0].id).toBeDefined()
    expect(response.body.data.actors[0].createdAt).toBeDefined()
    expect(response.body.data.actors[0].updatedAt).toBeDefined()
  })
  it('should create a movie successfully with VHS', async () => {
    const movieData = {
      title: 'Casablanca',
      year: 1942,
      format: MOVIE_FORMAT.VHS,
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(200)
    expect(response.body.status).toBe(1)
    expect(response.body.data.title).toBe(movieData.title)
    expect(response.body.data.year).toBe(movieData.year)
    expect(response.body.data.format).toBe(movieData.format)
    expect(response.body.data.actors).toHaveLength(movieData.actors.length)
    expect(response.body.data.actors[0].name).toBe(movieData.actors[0])
    expect(response.body.data.actors[1].name).toBe(movieData.actors[1])
    expect(response.body.data.actors[0].id).toBeDefined()
    expect(response.body.data.actors[0].createdAt).toBeDefined()
    expect(response.body.data.actors[0].updatedAt).toBeDefined()
  })

  it('should not create a movie without title', async () => {
    const movieData = {
      year: 1942,
      format: MOVIE_FORMAT.DVD,
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Claude Rains',
        'Peter Lorre'
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Title is required and must be a string')
  })
  it('should not create a movie with empty title', async () => {
    const movieData = {
      title: '     ',
      year: 1942,
      format: MOVIE_FORMAT.DVD,
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Claude Rains',
        'Peter Lorre'
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Title is required and must be a string')
  })
  it('should not create a movie without year', async () => {
    const movieData = {
      title : 'Casablanca',
      format: MOVIE_FORMAT.DVD,
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Claude Rains',
        'Peter Lorre'
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Year must be a valid number between')
  })
  it('should not create a movie with string year', async () => {
    const movieData = {
      title : 'Casablanca',
      year: '100some',
      format: MOVIE_FORMAT.DVD,
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Claude Rains',
        'Peter Lorre'
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Year must be a valid number between')
  })
  it('should not create a movie with minus year', async () => {
    const movieData = {
      title : 'Casablanca',
      year: -100,
      format: MOVIE_FORMAT.DVD,
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Claude Rains',
        'Peter Lorre'
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Year must be a valid number between')
  })
  it('should not create a movie with unreal year', async () => {
    const movieData = {
      title : 'Casablanca',
      year: 20000,
      format: MOVIE_FORMAT.DVD,
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Claude Rains',
        'Peter Lorre'
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Year must be a valid number between')
  })
  it('should not create a movie without format', async () => {
    const movieData = {
      title : 'Casablanca',
      year: 1942,
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Claude Rains',
        'Peter Lorre'
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Format must be one of')
  })
  it('should not create a movie with empty space format', async () => {
    const movieData = {
      title : 'Casablanca',
      year: 1942,
      format: '    ',
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Claude Rains',
        'Peter Lorre'
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Format must be one of')
  })
  it('should not create a movie with wrong format', async () => {
    const movieData = {
      title : 'Casablanca',
      format: 'mp3',
      year: 1942,
      actors: [
        'Humphrey Bogart',
        'Ingrid Bergman',
        'Claude Rains',
        'Peter Lorre'
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Format must be one')
  })
  it('should not create a movie without actors', async () => {
    const movieData = {
      title : 'Casablanca',
      year: 1942,
      format: MOVIE_FORMAT.DVD,
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Actors must be an array')
  })
  it('should not create a movie with empty space actors', async () => {
    const movieData = {
      title : 'Casablanca',
      year: 1942,
      format: MOVIE_FORMAT.DVD,
      actors: [
        'Humphrey Bogart',
        '     ',
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Each actor must be a non-empty string')
  })
  it('should not create a movie with number actors', async () => {
    const movieData = {
      title : 'Casablanca',
      year: 1942,
      format: MOVIE_FORMAT.DVD,
      actors: [
        'Humphrey Bogart',
        666,
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Each actor must be a non-empty string')
  })
  it('should not create a movie with invalid actors', async () => {
    const movieData = {
      title : 'Casablanca',
      year: 1942,
      format: MOVIE_FORMAT.DVD,
      actors: [
        'Humphrey Bogart',
        null,
      ]
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Each actor must be a non-empty string')
  })
  it('should not create a movie with invalid actors', async () => {
    const movieData = {
      title : 'Casablanca',
      year: 1942,
      format: MOVIE_FORMAT.DVD,
      actors: undefined,
    }
    const response = await request(app)
      .post('/api/v1/movies')
      .send(movieData)
      .set('Authorization', `${testHelper.getToken()}`)

    expect(response.status).toBe(400)
    expect(response.body.errors.length).toBeGreaterThan(0)
    expect(response.body.errors[0].msg).toContain('Actors must be an array')
  })
})
