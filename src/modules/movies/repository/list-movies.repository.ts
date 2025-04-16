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
  static getOrder(sort: string, order: string) {
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

  static prepareWhereClause(query: MovieGetListParams) {
    const whereClause: any = {}

    if (query.title) {
      whereClause.title_lower = {
        [Op.like]: `%${query.title.toLowerCase()}%`
      }
    }

    if (query.search) {
      whereClause[Op.or] = [
        { title_lower: { [Op.like]: `%${query.search.toLowerCase()}%` } }
      ]
    }
    return whereClause
  }

  static prepareActorWhereClause(query: MovieGetListParams) {
    const actorWhereClause:any = {}

    if (query?.actor || query?.search) {
      if (query?.actor) {
        actorWhereClause.name = { [Op.like]: `%${query.actor.toLowerCase()}%` }
      }

      if (query?.search) {
        actorWhereClause.name = {
          [Op.like]: `%${query.search.toLowerCase()}%`
        }
      }
    }
    return actorWhereClause
  }

  static getAtributes(query: MovieGetListParams) {
    const attributes = query.sort === 'title'
      ? { include: ['title_lower'] }
      : { exclude: ['title_lower'] }
    return attributes
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

    let whereClause: any = {}
    let actorWhereClause: any = {}

    whereClause = this.prepareWhereClause({
      title,
      search
    })

    actorWhereClause = this.prepareActorWhereClause({
      actor,
      search
    })

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
      attributes: this.getAtributes({ sort }),
      order: this.getOrder(sort, order),
      limit: Number(limit),
      offset: Number(offset),
      distinct: true,
    })

    const cleanMovies = this.stripPrivateFields(movies, ['title_lower'])

    return { movies: cleanMovies, total }
  }
}