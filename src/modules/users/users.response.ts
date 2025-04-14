import { SessionsResponse } from '../sessions/sessions.response'

export class UsersResponse {
  static async create(token: string,) {
    return SessionsResponse.create(token)
  }
}
