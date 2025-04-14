import { body } from 'express-validator'
import { MOVIE_FORMATS } from '../movies.constants'
import { RequestValidatror } from '../../../utils/request.validatro'
export class MoviesValidatorCreate {
  private static validateYear() {
    return body('year')
      .notEmpty().withMessage('Year is required.')
      .isInt({ min: 0 }).withMessage('Year must be a valid number greater than or equal to 0.')
  }
  private static validateTitle() {
    return body('title')
      .notEmpty().withMessage('Title is required.')
      .isString().withMessage('Title must be a string.')
  }
  private static getFormatMessage() {
    return `Format must be one of ${MOVIE_FORMATS.join(', ')}.`
  }
  private static validateFormat() {
    return body('format')
      .isIn(MOVIE_FORMATS).withMessage(this.getFormatMessage())
  }

  private static validateActors() {
    return body('actors')
      .isArray().withMessage('Actors must be an array.')
    }

  public static validate = [
    this.validateTitle(),
    this.validateYear(),
    this.validateFormat(),
    this.validateActors(),
    RequestValidatror.validateRequestMiddleware,
  ]
}