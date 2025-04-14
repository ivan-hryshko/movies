import { Request, Response } from 'express'
import { Logger } from '../../utils/logger'
import { SessionsValidator } from './sessions.validator'
import { SessionsResponse } from './sessions.response'
import { SessionsService } from './sessions.service'

export class SessionsController {
  static create = async (req: Request, res: Response): Promise<void> => {
    const dto = SessionsValidator.create(req, res)

    try {
      const token = await SessionsService.create(dto)
      const userRes = await SessionsResponse.create(token)

      res.status(200).json(userRes)
    } catch (error) {
      Logger.error('Error creating user:', error)
      res.status(500).json({ message: 'Error creating user', error })
    }
  }
}
