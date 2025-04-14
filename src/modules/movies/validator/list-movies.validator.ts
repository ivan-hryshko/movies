import { query } from 'express-validator'
import { RequestValidatror } from '../../../utils/request.validatro'

export class MoviesValidatorList {
  static validate = [
    query('actor').optional().isString(),
    query('title').optional().isString(),
    query('search').optional().isString(),
    query('sort').optional().isIn(['id', 'title', 'year']),
    query('order').optional().isIn(['ASC', 'DESC']),
    query('limit').optional().isInt({ min: 0, max: 100 }),
    query('offset').optional().isInt({ min: 0 }),
    RequestValidatror.validateRequestMiddleware,
  ]
}
