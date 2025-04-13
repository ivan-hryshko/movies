import { Request, Response } from 'express';
import { Logger } from '../../utils/logger';
import { RequestValidatror } from '../../utils/request.validatro';
import { UsersValidator } from './users.validator';
import { UsersService } from './users.service';
import { UsersResponse } from './users.response';

export class MovieController {
  static create = async (req: Request, res: Response): Promise<void> => {
    const dto = UsersValidator.create(req, res);

    try {
      const user = await UsersService.create(dto);
      const token = UsersService.generateTokenForUser(user);
      const userRes = await UsersResponse.create(token);

      res.status(200).json(userRes);
    } catch (error) {
      Logger.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error });
    }
  }
}
