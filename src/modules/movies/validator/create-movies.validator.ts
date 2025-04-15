import { body } from 'express-validator'
import { MOVIE_FORMATS } from '../movies.constants'
import { RequestValidatror } from '../../../utils/request.validatro'
import { MoviesValidator } from './movies.validator'

export class MoviesValidatorCreate extends MoviesValidator {
  private static validateYear() {
    return body('year')
      .notEmpty().withMessage('Year is required.')
      .isInt({ min: 0, max: this.getMaxYear() }).withMessage('Year must be a valid number greater than or equal to 0.')
  }
  private static validateTitle() {
    return body('title')
      .trim()
      .notEmpty().withMessage('Title is required.')
      .isString().withMessage('Title must be a string.')
  }
  private static getFormatMessage() {
    return `Format must be one of ${MOVIE_FORMATS.join(', ')}.`
  }
  private static validateFormat() {
    return body('format')
      .trim()
      .isIn(MOVIE_FORMATS).withMessage(this.getFormatMessage())
  }

  private static validateActors() {
    return body('actors')
      .isArray().withMessage('Actors must be an array.')
      .custom((actors) => {
        for (const actor of actors) {
          if (typeof actor !== 'string' || actor.trim() === '') {
            throw new Error('Each actor must be a non-empty string')
          }
        }

        return true
      })
  }

  public static validate = [
    this.validateTitle(),
    this.validateYear(),
    this.validateFormat(),
    this.validateActors(),
    RequestValidatror.validateRequestMiddleware,
  ]
}