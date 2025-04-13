import Movie from '../../models/movies.model';
import Actor from '../../models/actors.model';
import { MoviesRepository } from './movies.repository';
export class MovieResponse {
  static format(data: any) {
    return {
      data,
      status: 1
    }
  }

  static async createMovieResponse(movie: Movie) {
    const preparedMovie = await MoviesRepository.getById(movie.id)
    return this.format(preparedMovie)
  }
}
