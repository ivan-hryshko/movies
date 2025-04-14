import fs from 'fs'
import path from 'path'
import { Request } from 'express'
import { IStorageStrategy } from './IStorageStrategy'

export class LocalStorageStrategy implements IStorageStrategy {
  private baseDir: string

  constructor(subfolder: string) {
    this.baseDir = path.resolve(__dirname, `../../storage/${subfolder}`)
  }

  getDestination(req: Request, file: Express.Multer.File): string {
    return this.baseDir
  }

  getFilename(req: Request, file: Express.Multer.File): string {
    return `${Date.now()}-${file.originalname}`
  }

  ensureExists(): void {
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true })
    }
  }
}
