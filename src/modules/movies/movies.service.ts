import fs from 'fs'
import Movie from '../../models/movies.model'
import Actor from '../../models/actors.model'
import { CreateMovieDto } from './dto/create-movies.dto'
import { MovieRequestDelete } from './movies.request'
import { MoviesRepository } from './movies.repository'
import { Logger } from '../../utils/logger'
import { MoviesValidator } from './validator/movies.validator'

export class MoviesService {
  public static async create(dto: CreateMovieDto) {
    const { title, year, format, actors } = dto

    const newMovie = await MoviesRepository.create({
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

  static parseMoviesTxtFromFile(path: string): CreateMovieDto[]  {
    const content = fs.readFileSync(path, 'utf-8').trim()
    const entrieBlocks = content.split(/\n\s*\n/)

    const moviesData: CreateMovieDto[] = entrieBlocks.map(block => {
      const lines = block.split('\n')
      const movieData: any = {}

      lines.forEach(line => {
        const [key, ...rest] = line.split(':')
        const value = rest.join(':').trim()

        switch (key.trim()) {
          case 'Title':
            movieData.title = value
            break
          case 'Release Year':
            movieData.year = parseInt(value)
            break
          case 'Format':
            movieData.format = value
            break
          case 'Stars':
            movieData.actors = value.split(',').map(actor => actor.trim())
            break
        }
      })
      const movie = new CreateMovieDto(movieData)

      return movie
    })
    return moviesData
  }

  static async import(file: Express.Multer.File): Promise<{createdMovies:Movie[], total:number, imported:number}> {
    const moviesData: CreateMovieDto[] = this.parseMoviesTxtFromFile(file.path)

    const createdMovies: Movie[] = []

    for (const data of moviesData) {
      const errors = MoviesValidator.validate(data)

      if (errors.length) {
        Logger.error(`Validation failed for "${data.title}": ${errors.join(', ')}`, {})
        continue
      }
      const list = await MoviesRepository.getList({
        title: data.title,
      })
      if (list.movies.length > 0) {
        continue
      }
      const dto = new CreateMovieDto({
        title: data.title,
        year: data.year,
        format: data.format,
        actors: data.actors,
      })
      try {
        const newMovie = await this.create(data)
        createdMovies.push(newMovie)
      } catch (error) {
        Logger.error(`Error creating movie: ${data}`, error)
      }
    }

    return {
      createdMovies,
      total: createdMovies.length,
      imported: moviesData.length,
    }
  }
}