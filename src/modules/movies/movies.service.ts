import Movie from '../../models/movies.model';
import Actor from '../../models/actors.model';
import { CreateMovieDto } from './dto/create-movies.dto';

export class MoviesService {
  public static async createMovie(dto: CreateMovieDto) {
    const { title, year, format, actors } = dto;

    const newMovie = await Movie.create({
      title,
      year,
      format,
    });

    const actorInstances = await Promise.all(
      actors.map(async (actorName: string) => {
        let actor = await Actor.findOne({ where: { name: actorName } });

        if (!actor) {
          actor = await Actor.create({ name: actorName });
        }

        return actor;
      })
    );

    await newMovie.setActors(actorInstances);  // This is the many-to-many association

    return newMovie;
  }
}