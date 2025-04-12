import { Request, Response } from 'express';

export class MovieController {
  static createMovie = async (req: Request, res: Response): Promise<void> => {
    try {
      res.status(200).json({ message: 'Movie created successfully', data: {} });
    } catch (error) {
      console.error('Error creating movie:', error);
      res.status(500).json({ message: 'Error creating movie', error });
    }
  }
}
