import { query } from 'express-validator'
import { RequestValidatror } from '../../../utils/request.validatro'

export class MoviesValidatorList {
  static validate = [
    query('actor').trim().optional().isString(),
    query('title').trim().optional().isString(),
    query('search').trim().optional().isString(),
    query('sort').trim().optional().isIn(['id', 'title', 'year']),
    query('order').trim().optional().isIn(['ASC', 'DESC']),
    query('limit').optional().isInt({ min: 0, max: 100 }),
    query('offset').optional().isInt({ min: 0 }),
    RequestValidatror.validateRequestMiddleware,
  ]
}
