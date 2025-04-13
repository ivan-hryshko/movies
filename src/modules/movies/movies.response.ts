import Movie from '../../models/movies.model';
import { MoviesRepository } from './movies.repository';
import { ResponseUtil } from '../../utils/response/response-util';
export class MovieResponse {
  static format(data: any) {
    return {
      data,
      status: 1
    }
  }

  static async create(movie: Movie) {
    const preparedMovie = await MoviesRepository.getById(movie.id)
    return this.format(preparedMovie)
  }

  static delete() {
    return ResponseUtil.successDelete()
  }
}
