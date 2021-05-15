const express = require('express')
const app = express()
const authRouter = require('./src/routes/auth')
const userRouter = require('./src/routes/user')
const authMiddleware = require('./src/middlewares/auth')

// Load the environment variables
require('dotenv').config()

// Register our managers
require('./src/managers/cache')

// Register our middlewares
app.use(authMiddleware)
app.use(express.json())

// Register our routes
app.use('/auth', authRouter)
app.use('/users', userRouter)

// Starting the server
app.listen(process.env.APP_PORT, () => {
    console.log(`Started mCart backend at ${process.env.APP_PORT}`)
})
