
const APP_PORT = process.env.APP_PORT || 8050
if (!APP_PORT) {
  console.error('APP_PORT is not defined in the environment variables')
}
const ENV_VARIABLES = {
  APP_PORT,
}

export default ENV_VARIABLES