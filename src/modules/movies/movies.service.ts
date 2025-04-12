import Movie from '../../models/movies.model';
import { CreateMovieDto } from './dto/create-movies.dto';

export class MoviesService {
  public static async createMovie(dto: CreateMovieDto) {
    const { title, year, format } = dto;

    const newMovie = await Movie.create({
      title,
      year,
      format,
    });
    return newMovie;
  }
}