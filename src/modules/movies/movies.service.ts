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

  static async getList(query: any) {
    const movies = await MoviesRepository.getList(query)

    return movies
  }

  static parseMoviesTxt(file: Buffer) {
    const content = file.toString('utf-8').trim()
    const entries = content.split(/\n\s*\n/) // split by empty lines
  
    return entries.map(block => {
      const lines = block.split('\n')
      const movie: any = {}
  
      lines.forEach(line => {
        const [key, ...rest] = line.split(':')
        const value = rest.join(':').trim()
  
        switch (key.trim()) {
          case 'Title':
            movie.title = value
            break
          case 'Release Year':
            movie.year = value
            break
          case 'Format':
            movie.format = value
            break
          case 'Stars':
            movie.actors = value.split(',').map(actor => actor.trim())
            break
        }
      })
  
      return movie
    })
  }

  static async import(file: Express.Multer.File): Promise<Movie[]> {
    const moviesData = this.parseMoviesTxt(file.buffer)

    const createdMovies: Movie[] = []

    for (const data of moviesData) {
      // const [movie] = await Movie.findOrCreate({
      //   where: { title: data.title },
      //   defaults: {
      //     year: data.year,
      //     format: data.format,
      //   },
      // })

      // for (const name of data.actors) {
      //   const [actor] = await Actor.findOrCreate({ where: { name } })
      //   await movie.addActor(actor)
      // }

      // createdMovies.push(movie)
    }

    return createdMovies
  }
}