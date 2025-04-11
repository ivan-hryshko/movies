import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Welcome to Movies!')
})

export default app
