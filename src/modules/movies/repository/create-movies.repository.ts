import Movie from "../../../models/movies.model"

export type MovieCreateparams = {
  title: string
  year: number
  format: string
}
export class MoviesRepositoryCreate {
  static async create(params: MovieCreateparams) {
    const movie = await Movie.create({
      title: params.title,
      title_lower: params.title.toLocaleLowerCase('und'),
      year: params.year,
      format: params.format,
    })
    const plainMovie = movie.get({ plain: true }) as { [key: string]: any }
    delete plainMovie.title_lower
    return movie
  }
}