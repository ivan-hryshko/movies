import { Op } from "sequelize"
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

  static async getList(query: any) {
    const {
      actor,
      title,
      search,
      sort = 'id',
      order = 'ASC',
      limit = 20,
      offset = 0,
    } = query

    const whereClause: any = {}
    const actorWhereClause: any = {}

    if (title) {
      whereClause.title = { [Op.iLike]: `%${title}%` }
    }

    if (actor) {
      actorWhereClause.name = { [Op.iLike]: `%${actor}%` }
    }

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { '$actors.name$': { [Op.iLike]: `%${search}%` } },
      ]
    }

    const movies = await Movie.findAll({
      where: whereClause,
      include: [
        {
          model: Actor,
          as: 'actors',
          where: Object.keys(actorWhereClause).length ? actorWhereClause : undefined,
          through: { attributes: [] },
          required: !!actor || !!search,
        },
      ],
      order: [[sort, order]],
      limit: Number(limit),
      offset: Number(offset),
    })

    return movies
  }
}