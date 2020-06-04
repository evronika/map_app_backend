var mongoose = require('mongoose')

// Setup schema
var taskSchema = mongoose.Schema({
  _id: {
    type: String
  },
  service_id: {
    type: String,
    required: true
  },
  service_option_id: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: false
  },
  description: {
    type: String,
    index: true,
    unique: true
  },
  date_created: Date,
  date_updated: Date,
  is_deleted: {
    type: Number,
    default: 0
  }
})

// Export Contact model
var Task = module.exports = mongoose.model('tasks', taskSchema)
module.exports.get = function (callback, limit) {
  Task.find(callback).limit(limit)
}
