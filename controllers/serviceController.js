// Import service model
Service = require('../models/serviceModel');
const v4 = require('uuid/v4');
const JSON = require('circular-json');

// Handle index actions
exports.index = function (req, res) {
    Service.get(function (err, services) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Services retrieved successfully",
            data: services
        });
    });
};

// Handle create service actions
exports.new = function (req, res) {
    var service = new Service();
    service._id = v4();
    service.name = req.body.name ? req.body.name : 'Unknown';
    service.image = req.body.image;
    service.is_deleted = req.body.is_deleted ? req.body.is_deleted : 0;
// save the service and check for errors
    service.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New service created!',
            data: req.body
        });
    });
};

// Handle view service info
exports.view = function (req, res) {
    Service.findById(req.params.service_id, function (err, service) {
        if (err)
            res.send(err);
        res.json({
            message: 'Service details loading..',
            data: service
        });
    });
};

// Handle update service info
exports.update = function (req, res) {
    Service.findById(req.params.service_id, function (err, service) {
        if (err)
            res.send(err);
        service.name = req.body.name ? req.body.name : 'Unknown';
        service.image = req.body.image;
        service.is_deleted = req.body.is_deleted ? req.body.is_deleted : 0;
// save the service and check for errors
        service.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Service Info updated',
                data: service
            });
        });
    });
};

// Handle delete service
exports.delete = function (req, res) {
    Service.remove({
        _id: req.params.service_id
    }, function (err, service) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Service deleted'
        });
    });
};