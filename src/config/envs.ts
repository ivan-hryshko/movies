
const APP_PORT = process.env.APP_PORT || 8050
if (!APP_PORT) {
  console.error('APP_PORT is not defined in the environment variables')
}
const APP_ENV = process.env.APP_ENV || 'development'
if (!APP_ENV) {
  console.error('APP_ENV is not defined in the environment variables')
}
const JWT_SECRET = process.env.JWT_SECRET || 'very_secretT1!'
if (!JWT_SECRET) {
  console.error('JWT_SECRET is not defined in the environment variables')
}
const ENV_VARIABLES = {
  APP_PORT,
  APP_ENV,
  JWT_SECRET,
}

export default ENV_VARIABLES