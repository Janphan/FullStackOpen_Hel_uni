
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const bloglistRouter = require('./controllers/bloglist')
const loginRouter = require('./controllers/login')
const userRouter = require('./controllers/users')

const app = express()

const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1']);
logger.info('connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', bloglistRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app