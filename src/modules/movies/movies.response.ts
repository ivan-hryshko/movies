import Movie from '../../models/movies.model';
import Actor from '../../models/actors.model';

export class MovieResponse {
  static format(movie: Movie & { actors?: Actor[] }) {
    return {
      data: {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        format: movie.format,
        createdAt: movie.createdAt,
        updatedAt: movie.updatedAt,
        actors: movie.actors?.map(actor => ({
          id: actor.id,
          name: actor.name,
          createdAt: actor.createdAt,
          updatedAt: actor.updatedAt
        })) || []
      },
      status: 1
    }
  }

  static createMovieResponse(movie: Movie & { actors?: Actor[] }) {
    return {
      message: 'Movie created successfully',
      data: this.format(movie)
    }
  }
}
