require('dotenv').config()

const express = require('express')
const morgan = require('./middleware/morgan')
const mongoose = require('mongoose')
const cookieParser = require("cookie-parser")
const routes = require('./routes/index')

// express app
const app = express()

// Add the cookie-parser
app.use(cookieParser());

// Add morgan middleware
app.use(morgan)

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }))

// middleware
app.use(express.json())

// routes
app.use('/', require('./routes/root'))
app.use('/api', routes)

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, async () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })
