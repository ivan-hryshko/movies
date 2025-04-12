import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface MovieAttributes {
  id: number;
  title: string;
  year: number;
  format: string;
}

interface MovieCreationAttributes extends Optional<MovieAttributes, 'id'> {}

class Movie extends Model<MovieAttributes, MovieCreationAttributes> implements MovieAttributes {
  public id!: number;
  public title!: string;
  public year!: number;
  public format!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    format: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    tableName: 'movies',
    sequelize,
  }
);

export default Movie;
