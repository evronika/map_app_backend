// Import service model
const Service = require('../models/serviceModel')
const v4 = require('uuid/v4')

// Handle index actions
exports.index = function (req, res) {
  try {
    Service.find({ is_deleted: 0 }, function (err, services) {
      res.json({
        status: 'success',
        message: 'Services retrieved successfully',
        data: services
      })
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

// Handle create service actions
exports.new = function (req, res) {
  const object = {
    _id: v4(),
    name: req.body.name ? req.body.name : 'Unknown',
    image: req.body.image ? req.body.image : '',
    date_created: new Date(),
    is_deleted: req.body.is_deleted ? req.body.is_deleted : 0
  }
  try {
    Service.create(object, (error, res) => {
      res.json({
        message: 'New service is created!',
        data: object
      })
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

// Handle view service info
exports.view = function (req, res) {
  try {
    Service.findById(req.params.service_id, function (err, service) {
      if (err) { res.send(err) }
      res.json({
        message: 'Service details are loaded',
        data: service
      })
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

// Handle update service info
exports.update = function (req, res) {
  try {
    Service.findById(req.params.service_id, function (err, service) {
      service.name = req.body.name
      service.image = req.body.image
      service.is_deleted = req.body.is_deleted ? req.body.is_deleted : 0
      service.date_updated = new Date()

      service.save(function () {
        res.json({
          message: 'Service Info updated',
          data: service
        })
      })
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

// Handle delete service
exports.delete = function (req, res) {
  try {
    Service.findById(req.params.service_id, function (err, service) {
      service.is_deleted = 1
      if (err) { res.json(err) }
      // eslint-disable-next-line handle-callback-err
      service.save(function (err) {
        res.json({
          success: true,
          message: 'Service is deleted',
          id: service._id
        })
      })
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

exports.getTrash = function (req, res) {
  try {
    Service.find({ is_deleted: 1 }, function (error, services) {
      res.json({
        status: 'success',
        message: 'Trash is retrieved successfully',
        data: services
      })
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

exports.cleanTrash = function (req, res) {
  try {
    Service.deleteMany({ is_deleted: 1 }, function (error, services) {
      res.json({
        status: 'success',
        message: 'Trash is cleared successfully',
        data: services
      })
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}
