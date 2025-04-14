import { col, fn, Op, where } from "sequelize"
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
      whereClause.title = where(fn('LOWER', col('title')), {
        [Op.like]: `%${title.toLowerCase()}%`
      })
    }

    if (actor) {
      actorWhereClause.name = {
        [Op.like]: `%${actor.toLowerCase()}%`
      }
    }

    let actorIncludeWhere: any = undefined
    if (actor || search) {
      actorIncludeWhere = {
        ...(actor ? actorWhereClause : {}),
        ...(search ? {
          name: {
            [Op.like]: `%${search.toLowerCase()}%`
          }
        } : {})
      }
    }

    if (search) {
      whereClause[Op.or] = [
        where(fn('LOWER', col('title')), {
          [Op.like]: `%${search.toLowerCase()}%`
        }),
      ]
    }

    const { count: total, rows: movies } = await Movie.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Actor,
          as: 'actors',
          where: actorIncludeWhere,
          through: { attributes: [] },
          required: !!actor || !!search,
          attributes: [],
        },
      ],
      order: [[sort, order]],
      limit: Number(limit),
      offset: Number(offset),
      distinct: true,
    })

    return { movies, total }
  }
}