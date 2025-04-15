import { ValidationErrorItem } from "sequelize"
import { User } from "../../models/users.model"
import { generateToken } from "../../utils/jwt"
import { UsersRequestCreate } from "./users.request"


export class UsersService {
  static async create(dto: UsersRequestCreate): Promise<User> {
    const user = await User.create({
      email: dto.email,
      name: dto.name,
      password: dto.password,
    }).catch(error => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        const errors: ValidationErrorItem[] = error.errors
        if (errors[0].type ==='unique violation') {
          throw new Error('EMAIL_ALREADY_EXISTS')
        }
      }
      throw new Error(error)
    })
    return user
  }

  public static generateTokenForUser(user: User) {
    const token = generateToken(user.toJSON())
    return token
  }
}