var mongoose = require('mongoose')

// Setup schema
var serviceSchema = mongoose.Schema({
  _id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  date_created: Date,
  date_updated: Date,
  is_deleted: {
    type: Number,
    default: 0
  }
})

// Export Contact model
var Service = module.exports = mongoose.model('services', serviceSchema)
module.exports.get = function (callback, limit) {
  Service.find(callback).limit(limit)
}
