import { Request, Response } from 'express'
import { MoviesService } from './movies.service'
import { CreateMovieDto } from './dto/create-movies.dto'
import { MovieResponse } from './movies.response'
import { Logger } from '../../utils/logger'
import { MoviesValidatorDelete } from './validator/delete-movie.validator'
import { MoviesValidatorShow } from './validator/show-movie.validator'

export class MovieController {
  static create = async (req: Request, res: Response): Promise<void> => {
    const dto = new CreateMovieDto(req.body)

    try {
      const movie = await MoviesService.create(dto)
      const movieRes = await MovieResponse.create(movie)
      res.status(200).json(movieRes)
    } catch (error) {
      Logger.error('Error creating movie:', error)
      res.status(500).json({ message: 'Error creating movie', error })
    }
  }

  static delete = async (req: Request, res: Response): Promise<void> => {
    const params = MoviesValidatorDelete.validate(req, res)

    try {
      await MoviesService.delete(params)
      res.status(200).json(MovieResponse.delete())
    } catch (error: any) {
      if (error?.message === 'Movie not found') {
        res.status(400).json({ message: 'Movie not found' })
      } else {
        Logger.error('Error deleting movie:', error)
        res.status(500).json({ message: 'Error deleting movie', error })
      }
    }
  }
  static async show(req: Request, res: Response): Promise<void>{
    const params = MoviesValidatorShow.validate(req, res)

    try {
      const movie = await MoviesService.getById(params.id)
      res.status(200).json(MovieResponse.show(movie))
    } catch (error: any) {
      if (error?.message === 'Movie not found') {
        res.status(400).json({ message: '`Movie not found`' })
      } else {
        Logger.error('Error getting movie:', error)
        res.status(500).json({ message: 'Error getting movie', error })
      }
    }
  }
  static async list(req: Request, res: Response): Promise<void>{
    try {
      const { movies, total } = await MoviesService.getList(req.query)
      res.json(MovieResponse.list(movies, total))
    } catch (error) {
      Logger.error('Error getting movie:', error)
      res.status(500).json({ message: 'Error getting movie', error })
    }
  }
  static async import(req: Request, res: Response): Promise<void>{
    try {
      const file = req.file
      if (!file) res.status(400).json({ error: 'No file uploaded' })
      const { createdMovies, total, imported } = await MoviesService.import(file)
      res.status(200).json(MovieResponse.import(createdMovies, total, imported))
    } catch (error) {
      Logger.error('Error getting movie:', error)
      res.status(500).json({ message: 'Error getting movie', error })
    }
  }
}
