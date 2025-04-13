import { RequestValidatror } from '../../utils/request.validatro';
import { SessionsRequestCreate } from './sessions.request';
import UsersCreateRules from '../users/validator/users-create-rules';

export class SessionsValidator  {
  public static createMiddleware = [
    UsersCreateRules.validateEmail(),
    UsersCreateRules.validatePassword(),
  ];

  public static create(req: any, res: any) {
    RequestValidatror.validateRequest(req, res);
    return {
      email: req.body.email,
      password: req.body.password,
    } as SessionsRequestCreate
  }
}