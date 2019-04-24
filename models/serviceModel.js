var mongoose = require('mongoose');

// Setup schema
var serviceSchema = mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    is_deleted: Number
});


// Export Contact model
var Service = module.exports = mongoose.model('services', serviceSchema);
module.exports.get = function (callback, limit) {
    Service.find(callback).limit(limit);
}