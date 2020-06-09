var mongoose = require('mongoose')

var taskSchema = mongoose.Schema({
  _id: {
    type: String
  },
  service_id: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    index: true,
    unique: false
  },
  date_created: Date,
  date_updated: Date,
  is_deleted: {
    type: Number,
    default: 0
  }
})

// Export model
var Task = module.exports = mongoose.model('tasks', taskSchema)
module.exports.get = function (callback, limit) {
  Task.find(callback).limit(limit)
}
