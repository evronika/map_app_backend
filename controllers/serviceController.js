const Service = require('../models/serviceModel')
const v4 = require('uuid/v4')

exports.index = async function (req, res) {
  try {
    const services = await Service.find({ is_deleted: 0 })

    res.json({
      status: 'success',
      message: 'Services retrieved successfully',
      data: services
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

exports.new = async function (req, res) {
  const object = {
    _id: v4(),
    name: req.body.name ? req.body.name : 'Unknown',
    image: req.body.image ? req.body.image : '',
    date_created: new Date(),
    is_deleted: req.body.is_deleted ? req.body.is_deleted : 0
  }
  try {
    await Service.create(object)

    res.json({
      message: 'New service is created!',
      data: object
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

exports.view = async function (req, res) {
  try {
    const service = await Service.findById(req.params.service_id)

    res.json({
      message: 'Service details are loaded',
      data: service
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

exports.update = async function (req, res) {
  try {
    const service = await Service.findById(req.params.service_id)
    service.name = req.body.name
    service.image = req.body.image
    service.is_deleted = req.body.is_deleted ? req.body.is_deleted : 0
    service.date_updated = new Date()
    service.save()

    res.json({
      message: 'Service Info updated',
      data: service
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

exports.delete = async function (req, res) {
  try {
    const service = await Service.findById(req.params.service_id)
    service.is_deleted = 1
    service.save()

    res.json({
      success: true,
      message: 'Service is deleted',
      id: service._id
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

exports.getTrash = async function (req, res) {
  try {
    const trash = await Service.find({ is_deleted: 1 })

    res.json({
      status: 'success',
      message: 'Trash is retrieved successfully',
      data: trash
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}

exports.cleanTrash = async function (req, res) {
  try {
    const trash = await Service.deleteMany({ is_deleted: 1 })

    res.json({
      status: 'success',
      message: 'Trash is cleared successfully',
      data: trash
    })
  } catch (error) {
    res.json({ success: false, message: error })
  }
}
