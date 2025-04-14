import Actor from "../../models/actors.model"
import Movie from "../../models/movies.model"

export class MoviesRepository {
  static async getById(movieId: number) {
    const movie = await Movie.findByPk(movieId, {
      include: [
        {
          model: Actor,
          as: 'actors',
          through: { attributes: [] },
        },
      ],
    })

    return movie
  }
}