import express from 'express'
import rootRoutes from './routes/root.routes'
import apiV1routes from './routes/api-v1.routes.js'

const app = express()

app.use(express.json())

app.use('/', rootRoutes)
app.use('/api/v1', apiV1routes)

export default app
