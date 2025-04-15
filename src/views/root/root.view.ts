import { TsNavigator } from "../../utils/ts-navigator";

export class RootView {
  static signup(): string {
    return TsNavigator.fromRoot('public/static/root/signup.html')
  }
}