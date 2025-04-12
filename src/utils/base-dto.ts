export class BaseDto {
  constructor(data: any) {
    this.initialize(data)
  }

  public initialize(data: any) {
    Object.assign(this, data)
  }
}
