import { MovieRequestShow } from "../movies.request";

export class MoviesValidatorShow {
  static validate(req: any, res: any) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ errors: ['Movie ID is required'] });
    }

    if (isNaN(id)) {
      return res.status(400).json({ errors: ['Movie ID must be a number'] });
    }

    if (id <= 0) {
      return res.status(400).json({ errors: ['Movie ID must be a positive number'] });
    }

    return {
      id: parseInt(req.params.id, 10)
    } as MovieRequestShow
  }
}