import multer from 'multer'
import { IStorageStrategy } from './IStorageStrategy'
import { Request } from 'express'

export class StorageManager {
  private strategy: IStorageStrategy

  constructor(strategy: IStorageStrategy) {
    this.strategy = strategy
    this.strategy.ensureExists()
  }

  getMulterStorage() {
    return multer({
      storage: multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb) => {
          cb(null, this.strategy.getDestination(req, file))
        },
        filename: (req: Request, file: Express.Multer.File, cb) => {
          cb(null, this.strategy.getFilename(req, file))
        },
      })
    })
  }
}
