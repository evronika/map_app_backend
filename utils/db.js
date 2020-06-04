// Import Mongoose
const mongoose = require('mongoose')
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost:27017/map_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const dbConnection = mongoose.connection
dbConnection.on('error', console.error.bind(console, 'connection error:'))
dbConnection.once('open', function () {
  console.debug('Connection to MongoDB established.')
})
module.exports = {
  db_connection: dbConnection
}
