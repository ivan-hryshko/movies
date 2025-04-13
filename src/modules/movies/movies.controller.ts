import { Request, Response } from 'express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieResponse } from './movies.response';
import { Logger } from '../../utils/logger';
import { RequestValidatror } from '../../utils/request.validatro';

export class MovieController {
  static create = async (req: Request, res: Response): Promise<void> => {
    RequestValidatror.validateRequest(req, res);
    const dto = new CreateMovieDto(req.body);

    try {
      const movie = await MoviesService.createMovie(dto);
      const movieRes = await MovieResponse.createMovieResponse(movie);
      res.status(200).json(movieRes);
    } catch (error) {
      Logger.error('Error creating movie:', error);
      res.status(500).json({ message: 'Error creating movie', error });
    }
  }

  static delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    RequestValidatror.validateRequest(req, res);
    const dto = new CreateMovieDto(req.body);

    try {
      const movie = await MoviesService.createMovie(dto);
      const movieRes = await MovieResponse.createMovieResponse(movie);
      res.status(200).json(movieRes);
    } catch (error) {
      Logger.error('Error creating movie:', error);
      res.status(500).json({ message: 'Error creating movie', error });
    }
  }
}
