import { col, fn, literal, Op, Order, Sequelize, where } from "sequelize"
import Actor from "../../../models/actors.model"
import Movie from "../../../models/movies.model"

export type MovieGetListParams = {
  actor?: string
  title?: string
  search?: string
  sort?: string
  order?: string
  limit?: number
  offset?: number
}

export class MoviesRepositoryList {
  static prepareOrderForGetList(sort: string, order: string) {
    if (sort === 'title') {
      return [['title_lower', order.toUpperCase()]] as Order
    }
    return [[sort, order.toUpperCase()]] as Order
  }

  static stripPrivateFields(items: any[], keys: string[] = []) {
    return items.map((item) => {
      const clean = typeof item.get === 'function' ? item.get({ plain: true }) : { ...item };
      for (const key of keys) {
        if (key in clean) delete clean[key];
      }
      return clean;
    });
  }

  static async getList(query: MovieGetListParams): Promise<{ movies: Movie[], total: number }> {
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
      whereClause.title_lower = {
        [Op.like]: `%${title.toLowerCase()}%`
      }
    }

    if (search) {
      whereClause[Op.or] = [
        { title_lower: { [Op.like]: `%${search.toLowerCase()}%` } }
      ]
    }

    if (actor || search) {
      if (actor) {
        actorWhereClause.name = { [Op.like]: `%${actor.toLowerCase()}%` }
      }

      if (search) {
        actorWhereClause.name = {
          [Op.like]: `%${search.toLowerCase()}%`
        }
      }
    }

    const { count: total, rows: movies } = await Movie.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Actor,
          as: 'actors',
          through: { attributes: [] },
          required: !!actor || !!search,
          where: Object.keys(actorWhereClause).length ? actorWhereClause : undefined,
          attributes: [],
        },
      ],
      attributes: sort === 'title'
        ? { include: ['title_lower'] }
        : { exclude: ['title_lower'] },
      order: this.prepareOrderForGetList(sort, order),
      limit: Number(limit),
      offset: Number(offset),
      distinct: true,
    })

    const cleanMovies = this.stripPrivateFields(movies, ['title_lower'])

    return { movies: cleanMovies, total }
  }
}