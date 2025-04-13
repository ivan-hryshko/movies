import { AuthenticationResponse } from '../authentication/auth.response';

export class UsersResponse {
  static async create(token: string,) {
    return AuthenticationResponse.create(token);
  }
}
