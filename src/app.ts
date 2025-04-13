import express from 'express'
import routes from './routes/index.js'

const app = express()

app.get('/', (req, res) => {
  res.send('Welcome to Movies!')
})

app.use(express.json());

app.use('/api/v1', routes)

export default app
