import { query } from 'express-validator'
import { RequestValidatror } from '../../../utils/request.validatro'

export class MoviesValidatorList {
  static validate = [
    query('actor').optional().trim().isString(),
    query('title').optional().trim().isString(),
    query('search').optional().trim().isString(),
    query('sort').optional().trim().isIn(['id', 'title', 'year']),
    query('order').optional().trim().isIn(['ASC', 'DESC']),
    query('limit').optional().isInt({ min: 0, max: 100 }),
    query('offset').optional().isInt({ min: 0 }),
    RequestValidatror.validateRequestMiddleware,
  ]
}
