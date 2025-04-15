import { Request, Response } from 'express'
import { RootView } from './root.view';

export class RootController {
  static async welcome(req: Request, res: Response): Promise<void>{
    const view = RootView.welcom()
    res.sendFile(view)
  }
}
