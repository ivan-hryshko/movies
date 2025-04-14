import { Sequelize } from 'sequelize'
import ENV_VARIABLES from './envs'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: ENV_VARIABLES.APP_ENV === 'development' ? true : false,
})

export default sequelize
