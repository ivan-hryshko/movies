import Movie from "./movies.model";

export class MoviesService {

  public static async createMovie(body: any) {
    const { title, year, format } = body;

    const newMovie = await Movie.create({
      title,
      year,
      format,
    });
    return newMovie;
  }
}