import express from 'express'
import rootRoutes from './routes/root.routes'
import apiV1routes from './routes/api-v1.routes.js'
import { TsNavigator } from './utils/ts-navigator'

const app = express()

app.use(express.json())


app.use('/static', express.static(TsNavigator.fromRoot('public/static')))
app.use('/', rootRoutes)
app.use('/api/v1', apiV1routes)

export default app
