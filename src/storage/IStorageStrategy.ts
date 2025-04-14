import { Request } from 'express'

export interface IStorageStrategy {
  getDestination(req: Request, file: Express.Multer.File): string
  getFilename(req: Request, file: Express.Multer.File): string
  ensureExists(): void
}
