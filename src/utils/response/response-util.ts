import { CustomResponse } from './response-util.types'

export class ResponseUtil {
  private static responseJson: CustomResponse = {}

  private static setStatus(status: number) {
    this.responseJson.status = status
  }
  private static setStatus1() {
    this.setStatus(1)
  }
  private static setData(data: any) {
    this.responseJson.data = data
  }

  public static getResponseJson() {
    return this.responseJson
  }

  public static setStatus1AndGetResponseJson() {
    this.setStatus1()
    return this.getResponseJson()
  }

  public static successDelete() {
    this.setStatus1()
    return this.getResponseJson()
  }

  public static successWithData(data: any) {
    this.setStatus1()
    this.setData(data)
    return this.getResponseJson()
  }
}