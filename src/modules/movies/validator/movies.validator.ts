export class MoviesValidator {
  static getMaxYear() {
    const currentYear = new Date().getFullYear()
    return currentYear + 30
  }
}