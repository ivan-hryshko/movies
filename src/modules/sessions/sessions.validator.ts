import { body, validationResult } from 'express-validator';
import { RequestValidatror } from '../../utils/request.validatro';
import { SessionsRequestCreate } from './sessions.request';

export class SessionsValidator  {
  private static validateEmail() {
    return body('email')
      .notEmpty().withMessage('Email is required.')
      .isEmail().withMessage('Email must be a valid email address.')
      .isLength({ min: 5, max: 100 }).withMessage('Email must be between 5 and 100 characters long.');
  }
  private static validateName() {
    return body('name')
      .notEmpty().withMessage('Name is required.')
      .isString().withMessage('Name must be a string.')
      .isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters long.');
  }
  private static validatePassword() {
    return body('password')
      .notEmpty().withMessage('Password is required.')
      .isString().withMessage('Password must be a string.')
      .isLength({ min: 8, max: 100 }).withMessage('Password must be between 8 and 100 characters long.');
  }
  private static validateConfirmPassword() {
    return body('confirmPassword')
      .notEmpty().withMessage('Confirm password is required.')
      .isString().withMessage('Confirm password must be a string.')
      .isLength({ min: 8, max: 100 }).withMessage('Confirm password must be between 8 and 100 characters long.')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Confirm password does not match password.');
        }
        return true;
      });
  }
  public static createMiddleware = [
    this.validateEmail(),
    this.validatePassword(),
  ];

  public static create(req: any, res: any) {
    RequestValidatror.validateRequest(req, res);
    return {
      email: req.body.email,
      password: req.body.password,
    } as SessionsRequestCreate
  }
}