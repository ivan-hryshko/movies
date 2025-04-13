import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public async comparePassword(candidate: string): Promise<boolean> {
    return await bcrypt.compare(candidate, this.password);
  }
}

User.init({
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users',
  hooks: {
    beforeCreate: async (user: User) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
  },
});
