import Movie from '../../models/movies.model'
import { MoviesRepository } from './movies.repository'
import { ResponseUtil } from '../../utils/response/response-util'
export class MovieResponse extends ResponseUtil {
  static async create(movie: Movie) {
    const movieRepostitory = await MoviesRepository.getById(movie.id)
    return this.successWithData(movieRepostitory)
  }
  static delete() {
    return this.successDelete()
  }
  static show(movie: Movie) {
    return this.successWithData(movie)
  }
}
