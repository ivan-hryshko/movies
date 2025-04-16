import { body } from 'express-validator'
import { RequestValidatror } from '../../../utils/request.validatro'
import { MoviesValidator } from './movies.validator'

export class MoviesValidatorCreate extends MoviesValidator {
  private static validateWithBusinessLogic() {
    return body().custom((value, { req }) => {
      const errors = this.validate(req.body)
      if (errors.length) {
        throw new Error(errors.join(', '))
      }
      return true
    })
  }

  public static validateMws = [
    this.validateWithBusinessLogic(),
    RequestValidatror.validateRequestMiddleware,
  ]
}