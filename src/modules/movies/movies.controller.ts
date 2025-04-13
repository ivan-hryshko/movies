import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movies.dto';
import { MovieResponse } from './movies.response';

export class MovieController {
  static createMovie = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const dto = new CreateMovieDto(req.body);

    try {
      const movie = await MoviesService.createMovie(dto);

      res.status(200).json({ data: movie, status: 1 });
      res.json(movie);

    } catch (error) {
      console.error('Error creating movie:', error);
      res.status(500).json({ message: 'Error creating movie', error });
    }
  }
}
