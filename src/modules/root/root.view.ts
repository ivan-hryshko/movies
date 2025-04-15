import { TsNavigator } from "../../utils/ts-navigator";

export class RootView {
  static welcom(): string {
    return TsNavigator.fromRoot('src/views/import.html')
  }
}