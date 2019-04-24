// Import task model
Task = require('../models/taskModel');
const v4 = require('uuid/v4');
const JSON = require('circular-json');

// Handle index actions
exports.index = function (req, res) {
    Task.get(function (err, tasks) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Tasks retrieved successfully",
            data: tasks
        });
    });
};

// Handle create task actions
exports.new = function (req, res) {
    var task = new Task();
    task._id = v4();
    task.name = req.body.name ? req.body.name : 'Unknown';
    task.image = req.body.image;
    task.is_deleted = req.body.is_deleted ? req.body.is_deleted : 0;
// save the task and check for errors
    task.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New task created!',
            data: req.body
        });
    });
};

// Handle view task info
exports.view = function (req, res) {
    Task.findById(req.params.task_id, function (err, task) {
        if (err)
            res.send(err);
        res.json({
            message: 'Task details loading..',
            data: task
        });
    });
};

// Handle update task info
exports.update = function (req, res) {
    Task.findById(req.params.task_id, function (err, task) {
        if (err)
            res.send(err);
        task.name = req.body.name ? req.body.name : 'Unknown';
        task.image = req.body.image;
        task.is_deleted = req.body.is_deleted ? req.body.is_deleted : 0;
// save the task and check for errors
        task.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Task Info updated',
                data: task
            });
        });
    });
};

// Handle delete task
exports.delete = function (req, res) {
    Task.remove({
        _id: req.params.task_id
    }, function (err, task) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Task deleted'
        });
    });
};