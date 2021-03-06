require('dotenv').config()
require('express-async-errors')
const path = require('path')
const express = require('express')
const cors = require('cors')
const authRouter = require('./routes/auth')
const commentRouter = require('./routes/comment')
const jobsRouter = require('./routes/jobs')

const authenticateUser = require('./middleware/auth')
const notFoundMiddleware = require('./middleware/not-found')
const errorHandler = require('./middleware/errorHandler')

const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')

const connectDB = require('./db/connect')

const app = express()
app.use(cors())

app.use(express.json())

app.use('/', express.static(path.resolve(__dirname, 'public')))
app.use('/api/v1/', commentRouter)
app.use('/api/v1/', authRouter)
app.use('/api/v1/', authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.set('trust proxy', 1)
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
)
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(errorHandler)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
