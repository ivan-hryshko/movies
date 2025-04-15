import { Request, Response } from 'express'
import { RootView } from '../../views/root/root.view';
import { MoviesView } from '../../views/movies/movies.view';

export class RootController {
  static async welcome(req: Request, res: Response): Promise<void>{
    const view = RootView.signup()
    res.sendFile(view)
  }

  static async moviesImport(req: Request, res: Response): Promise<void>{
    const view = MoviesView.import()
    res.sendFile(view)
  }
}
