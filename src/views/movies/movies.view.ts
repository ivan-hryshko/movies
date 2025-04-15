import { TsNavigator } from "../../utils/ts-navigator";

export class MoviesView {
  static import(): string {
    return TsNavigator.fromRoot('public/static/movies/import.html')
  }
}