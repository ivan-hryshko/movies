import Movie from '../../models/movies.model'
import Actor from '../../models/actors.model'
import { CreateMovieDto } from './dto/create-movies.dto'
import { MovieRequestDelete } from './movies.request'
import { MoviesRepository } from './movies.repository'

export class MoviesService {
  public static async create(dto: CreateMovieDto) {
    const { title, year, format, actors } = dto

    const newMovie = await Movie.create({
      title,
      year,
      format,
    })

    const actorInstances = await Promise.all(
      actors.map(async (actorName: string) => {
        let actor = await Actor.findOne({ where: { name: actorName } })

        if (!actor) {
          actor = await Actor.create({ name: actorName })
        }

        return actor
      })
    )

    await newMovie.setActors(actorInstances)

    return newMovie
  }

  static async delete(params: MovieRequestDelete) {
    const movie = await MoviesRepository.getById(params.id)
    if (!movie) {
      throw new Error('Movie not found')
    }

    await movie.destroy()
  }

  static async getById(id: number) {
    const movie = await MoviesRepository.getById(id)

    if (!movie) {
      throw new Error('Movie not found')
    }

    return movie
  }
}