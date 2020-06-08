const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./utils/db')

// Init app
var app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, '../app/public')));
// Import Body parser
const bodyParser = require('body-parser')

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

const apiRoutes = require('./api-routes')
app.use('/api', apiRoutes)
// Errors
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
})

module.exports = app
