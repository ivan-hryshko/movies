import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movies.dto';

export class MovieController {
  static createMovie = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const dto = new CreateMovieDto(req.body);

    try {
      const newMovie = await MoviesService.createMovie(dto);

      res.status(200).json({ message: 'Movie created successfully', data: { movie: newMovie} });
    } catch (error) {
      console.error('Error creating movie:', error);
      res.status(500).json({ message: 'Error creating movie', error });
    }
  }
}
