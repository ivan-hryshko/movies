import { body } from 'express-validator';

export class MoviesValidator {

  static createMovieValidators = [
    body('title')
      .notEmpty().withMessage('Title is required.')
      .isString().withMessage('Title must be a string.'),
    body('year')
      .notEmpty().withMessage('Year is required.')
      .isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Year must be a valid number between 1900 and the current year.'),
    body('format')
      .isIn(['VHS', 'DVD', 'Blu-ray']).withMessage('Format must be one of VHS, DVD, Blu-ray.'),
  ];
}