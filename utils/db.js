// Import Mongoose
let mongoose = require('mongoose');
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost:27017/map_app', {
    'useNewUrlParser': true,
    'useUnifiedTopology': true
});
let db_connection = mongoose.connection;
db_connection.on('error', console.error.bind(console, 'connection error:'));
db_connection.once('open', function() {
    console.debug('Connection established.');
});
module.exports = {
    db_connection: db_connection,
};