import { User } from "../../models/users.model";
import { generateToken } from "../../utils/jwt";
import { UsersRequestCreate } from "./users.request";


export class UsersService {
  static async create(dto: UsersRequestCreate): Promise<User> {
    const user = await User.create({
      email: dto.email,
      name: dto.name,
      password: dto.password,
    });
    return user;
  }

  public static generateTokenForUser(user: any) {
    const token = generateToken(user.toJSON());
    return token;
  }
}