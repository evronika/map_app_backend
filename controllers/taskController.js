// Import task model
const Task = require('../models/taskModel')
const v4 = require('uuid/v4')

// Handle index actions
exports.index = async function (req, res) {
  try {
    const tasks = await Task.find({ is_deleted: 0 })

    res.json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks
    })
  } catch (error) {
    res.json({
      success: false,
      message: error
    })
  }
}

exports.new = async function (req, res) {
  if (!req.body.description) {
    res.json({ success: false, message: 'Description is not specified. Please change the data.' })
  } else if (!req.body.location) {
    res.json({ success: false, message: 'Location is not specified. Please change the data.' })
  } else if (!req.body.service_id) {
    res.json({ success: false, message: '500 Error. Service id is not specified.' })
  }
  const object = {
    _id: v4(),
    description: req.body.description ? req.body.description : 'Unknown',
    location: req.body.location,
    date_created: new Date(),
    is_deleted: req.body.is_deleted ? req.body.is_deleted : 0,
    service_id: req.body.service_id,
    service_name: req.body.service_name
  }

  console.log('object to create', object)
  try {
    await Task.create(object)

    res.json({
      success: true,
      message: 'New task is created!',
      data: object
    })
  } catch (error) {
    res.json({
      success: false,
      message: error
    })
  }
}

// Handle view task info
exports.view = async function (req, res) {
  try {
    const task = await Task.findById(req.params.task_id)

    res.json({
      success: true,
      message: 'Task details are loaded.',
      data: task
    })
  } catch (error) {
    res.json({
      success: false,
      message: error
    })
  }
}

exports.getByServiceId = async function (req, res) {
  try {
    const tasks = await Task.find({
      is_deleted: 0,
      service_id: req.params.service_id
    })

    res.json({
      success: true,
      message: 'Tasks retrieved successfully',
      data: tasks
    })
  } catch (error) {
    res.json({
      success: false,
      message: error
    })
  }
}

// Handle update task info
exports.update = async function (req, res) {
  try {
    const task = await Task.findById(req.params.task_id)
    task.service_id = req.body.service_id
    task.service_name = req.service_name
    task.location = req.body.location ? req.body.location : task.location
    task.date_updated = new Date()
    task.description = req.body.description ? req.body.description : task.description
    task.save()

    res.json({
      success: true,
      message: 'Task Info updated',
      data: task
    })
  } catch (error) {
    res.json({
      success: false,
      message: error
    })
  }
}

// Handle delete task
exports.delete = async function (req, res) {
  try {
    const task = await Task.findById(req.params.task_id)
    task.is_deleted = 1
    task.save()

    res.json({
      success: true,
      message: 'Task is deleted',
      id: task._id
    })
  } catch (error) {
    res.json({
      success: false,
      message: error
    })
  }
}

exports.getTrash = async function (req, res) {
  try {
    const tasks = await Task.find({ is_deleted: 1 })

    res.json({
      success: true,
      message: 'Trash is retrieved successfully',
      data: tasks
    })
  } catch (error) {
    res.json({
      success: false,
      message: error
    })
  }
}

exports.cleanTrash = async function (req, res) {
  try {
    const tasks = await Task.deleteMany({ is_deleted: 1 })

    res.json({
      success: true,
      message: 'Trash is cleared successfully',
      data: tasks
    })
  } catch (error) {
    res.json({
      success: false,
      message: error
    })
  }
}
