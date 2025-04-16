import Movie from '../../models/movies.model'
import { ResponseUtil } from '../../utils/response/response-util'
import { MoviesRepositoryShow } from './repository/show-movies.repository'
export class MovieResponse extends ResponseUtil {
  static async create(movie: Movie) {
    const movieRepostitory = await MoviesRepositoryShow.show(movie.id)
    return this.successWithData(movieRepostitory)
  }
  static delete() {
    return this.successDelete()
  }
  static show(movie: Movie) {
    return this.successWithData(movie)
  }
  static list(movies: Movie[], total: number) {
    const meta = {
      total: total,
    }
    return this.successList(movies, meta)
  }
  static import(movies: Movie[], total: number, imported: number) {
    const meta = {
      total,
      imported,
    }
    return this.successList(movies, meta)
  }
}
