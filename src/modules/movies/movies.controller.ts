import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieResponse } from './movies.response';
import { Logger } from '../../utils/logger';

export class MovieController {
  static createMovie = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

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
