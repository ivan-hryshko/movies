// src/modules/movies/actor.model.ts

import { Model, DataTypes } from 'sequelize';

import sequelize from '../config/database'; // Adjust according to your setup

class Actor extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      unique: true, // Make name unique
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'actors',
    timestamps: true,
  }
);

export default Actor;
