import Movie from '../../models/movies.model';
import { MoviesRepository } from './movies.repository';
import { ResponseUtil } from '../../utils/response/response-util';
export class MovieResponse {
  static async create(movie: Movie) {
    const movieRepostitory = await MoviesRepository.getById(movie.id)
    return ResponseUtil.successWithData(movieRepostitory)
  }
  static delete() {
    return ResponseUtil.successDelete()
  }
  static show(movie: Movie) {
    return ResponseUtil.successWithData(movie)
  }
}
