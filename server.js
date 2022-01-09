const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(
  cors({
    origin: true,
  })
)

app.use(express.static(path.join(__dirname, 'build')))

app.get('/login', (req, res) => {
  if (req && req.query && req.query.code && req.query.state !== 'do-redirect') {
    res.send(req.query)
  } else {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  }
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(4200)
