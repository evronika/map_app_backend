// getNextSequence
Counter = require('../utils/nextSequence');
var mongoose = require('mongoose');

module.exports = function getNextSequence(name) {
    let ret = Counter.findOneAndUpdate(
        {
            query: { _id: name },
            update: { $inc: { seq: 1 } },
            new: true
        }
    );

    return ret.seq;
}