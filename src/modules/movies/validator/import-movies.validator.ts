import { Request, Response, NextFunction } from 'express'
import { RequestValidatror } from '../../../utils/request.validatro'

export class MoviesValidatorImport {
  private static validateMoviesFile(req: Request, res: Response, next: NextFunction) {
    const file = req.file

    if (!file) {
      return res.status(400).json({ errors: [{ msg: 'Movies file is required.' }] })
    }

    if (file.mimetype !== 'text/plain') {
      return res.status(400).json({ errors: [{ msg: 'Only .txt files are allowed.' }] })
    }

    // Optionally check filename
    if (!file.originalname.endsWith('.txt')) {
      return res.status(400).json({ errors: [{ msg: 'File must have .txt extension.' }] })
    }

    next()
  }

  public static validate = [
    this.validateMoviesFile,
    RequestValidatror.validateRequestMiddleware,
  ]
}
