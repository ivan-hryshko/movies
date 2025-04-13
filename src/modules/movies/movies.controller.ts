import { Request, Response } from 'express';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieResponse } from './movies.response';
import { Logger } from '../../utils/logger';
import { RequestValidatror } from '../../utils/request.validatro';
import { MoviesValidatorDelete } from './validator/delete-movie.validator';

export class MovieController {
  static create = async (req: Request, res: Response): Promise<void> => {
    RequestValidatror.validateRequest(req, res);
    const dto = new CreateMovieDto(req.body);

    try {
      const movie = await MoviesService.create(dto);
      const movieRes = await MovieResponse.create(movie);
      res.status(200).json(movieRes);
    } catch (error) {
      Logger.error('Error creating movie:', error);
      res.status(500).json({ message: 'Error creating movie', error });
    }
  }

  static delete = async (req: Request, res: Response): Promise<void> => {
    const params = MoviesValidatorDelete.validate(req, res);

    try {
      await MoviesService.delete(params);
      res.status(200).json(MovieResponse.delete());
    } catch (error) {
      Logger.error('Error creating movie:', error);
      res.status(500).json({ message: 'Error creating movie', error });
    }
  }
}
