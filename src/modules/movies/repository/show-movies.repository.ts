import Actor from "../../../models/actors.model"
import Movie from "../../../models/movies.model"

export class MoviesRepositoryShow {
  static async show(movieId: number) {
    const movie = await Movie.findByPk(movieId, {
      include: [
        {
          model: Actor,
          as: 'actors',
          through: { attributes: [] },
        },
      ],
      attributes: { exclude: ['title_lower'] },
    })

    return movie
  }
}