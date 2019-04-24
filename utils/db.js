// Import Mongoose
let mongoose = require('mongoose');
// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost:27017/map_app', {
    auth: {
        user: 'map_appl',
        password: 'map_appl4'
    },
    'useNewUrlParser': true
});
let db_connection = mongoose.connection;
module.exports = {
    db_connection: db_connection,
};