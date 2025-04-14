import { Model, DataTypes } from 'sequelize'

import sequelize from '../config/database'

class Actor extends Model {
  public id!: number
  public name!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Actor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'actors',
    timestamps: true,
  }
)

export default Actor
