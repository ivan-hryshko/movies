import { validationResult } from 'express-validator';

export class RequestValidatror {
  static validateRequest(req: any, res: any) {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      }
  }
}