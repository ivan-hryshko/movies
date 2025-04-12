import { Request, Response } from 'express';
import Movie from './movie.model';

export class MovieController {
  static createMovie = async (req: Request, res: Response): Promise<void> => {
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
