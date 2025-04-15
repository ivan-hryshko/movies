import { ValidationErrorItem } from "sequelize"
import { User } from "../../models/users.model"

export type UserCreteParams = {
  email: string,
  name: string,
  password: string,
}

export class UsersRepository {
  static async create(params: UserCreteParams) {
    const user = await User.create({
      email: params.email,
      name: params.name,
      password: params.password,
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
}