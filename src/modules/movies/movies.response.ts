import Movie from '../../models/movies.model';
import { MoviesRepository } from './movies.repository';
import { ResponseUtil } from '../../utils/response/response-util';
export class MovieResponse {
  static async create(movie: Movie) {
    const preparedMovie = await MoviesRepository.getById(movie.id)
    return ResponseUtil.successWithData(preparedMovie)
  }

  static delete() {
    return ResponseUtil.successDelete()
  }
}
