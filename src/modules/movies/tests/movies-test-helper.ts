import request from 'supertest'
import app from '../../../app'
import { testHelper } from '../../../utils/testHelper'

export class MoviesTestHelper extends testHelper {
  static async deleteAllMovies() {
    const listRes = await request(app)
      .get(`/api/v1/movies`)
      .set('Authorization', `${this.getToken()}`)

    expect(listRes.status).toBe(200)
    const body = listRes.body
    const movieIds = body.data.map((item: any) => item.id)

    for (const id of movieIds) {
      await request(app)
        .delete(`/api/v1/movies/${id}`)
        .set('Authorization', `${this.getToken()}`)
    }
  }
}