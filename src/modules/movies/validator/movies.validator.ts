import { MOVIE_FORMATS } from "../movies.constants"

export class MoviesValidator {
  static getMaxYear() {
    const currentYear = new Date().getFullYear()
    return currentYear + 30
  }


  static validate(data: any) {
    const errors: string[] = []

    if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
      errors.push('Title is required and must be a string.')
    }

    if (!data.year || isNaN(data.year) || data.year < 0 || data.year > this.getMaxYear()) {
      errors.push(`Year must be a valid number between 0 and ${this.getMaxYear()}.`)
    }

    if (!data.format || !MOVIE_FORMATS.includes(data.format)) {
      errors.push(`Format must be one of: ${MOVIE_FORMATS.join(', ')}`)
    }

    if (!Array.isArray(data.actors)) {
      errors.push('Actors must be an array.')
    } else {
      for (const actor of data.actors) {
        if (typeof actor !== 'string' || !actor.trim()) {
          errors.push('Each actor must be a non-empty string.')
        }
      }
    }

    return errors
  }
}