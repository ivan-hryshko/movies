import { CustomResponse } from './response-util.types'

export class ResponseUtil {
  private static responseJson: CustomResponse = {}

  private static setStatus(status: number) {
    this.responseJson.status = status
  }
  private static setStatus1() {
    this.setStatus(1)
  }

  public static getResponseJson() {
    return this.responseJson
  }

  public static successDelete() {
    this.setStatus1()
    return this.getResponseJson()
  }
}