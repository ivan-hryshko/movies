
import { ResponseUtil } from '../../utils/response/response-util';

export class AuthenticationResponse extends ResponseUtil {
  static create(token: string) {
    return {
      ...this.setStatus1AndGetResponseJson(),
      token,
    };
  }
}