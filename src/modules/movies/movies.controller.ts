import { Request, Response } from 'express';
import Movie from './movies.model';
import { validationResult } from 'express-validator';

export class MovieController {
  static createMovie = async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { title, year, format } = req.body;
    try {
      const newMovie = await Movie.create({
        title,
        year,
        format,
      });

      res.status(200).json({ message: 'Movie created successfully', data: { movie: newMovie} });
    } catch (error) {
      console.error('Error creating movie:', error);
      res.status(500).json({ message: 'Error creating movie', error });
    }
  }
}
