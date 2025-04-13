import { Model, DataTypes, Optional, BelongsToManySetAssociationsMixin, BelongsToManyAddAssociationsMixin } from 'sequelize';
import sequelize from '../config/database';
import Actor from './actors.model';

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

  public setActors!: BelongsToManySetAssociationsMixin<Actor, number>;

  public addActors!: BelongsToManyAddAssociationsMixin<Actor, number>;
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

Movie.belongsToMany(Actor, {
  through: 'movies_actors',
  as: 'actors',
  foreignKey: 'movie_id',
  otherKey: 'actor_id',
});

Actor.belongsToMany(Movie, {
  through: 'movies_actors',
  as: 'movies',
  foreignKey: 'actor_id',
  otherKey: 'movie_id',
});

export default Movie;
