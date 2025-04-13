import { User } from "../../models/users.model";
import { generateToken } from "../../utils/jwt";
import { SessionsRequestCreate } from "./sessions.request";

export class SessionsService {
  static async create(dto: SessionsRequestCreate): Promise<string> {
    const user = await User.findOne({ where: { email: dto.email } });
    if (!user ) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await user.comparePassword(dto.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken(user.toJSON());
    return token;
  }

}