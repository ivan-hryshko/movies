import app from './app'
import sequelize from './config/database'
import ENV_VARIABLES from './config/envs'

const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection established.')

    await sequelize.sync({ force: false })
    console.log('Models synchronized.')

    app.listen(ENV_VARIABLES.APP_PORT, () => {
      console.log(`Movies app listening at http://localhost:${ENV_VARIABLES.APP_PORT}`)
    })
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

startServer()