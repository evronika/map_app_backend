// counterModel.js
var mongoose = require('mongoose');

// Setup schema
var counterSchema = mongoose.Schema({
    _id: {
        type: String
    },
    seq: Number
});

// Export Counter model
var Counter = module.exports = mongoose.model('counters', counterSchema);
module.exports.get = function (callback, limit) {
    Counter.find(callback).limit(limit);
}