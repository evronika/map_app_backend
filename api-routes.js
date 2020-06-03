// Initialize express router
let router = require('express').Router();
let serviceRouter = require('./routes/service');
// Init routes

/* GET home page. */

router.get('/', function(req,res){
    let json_data = {'name':'amita','pass':'12345'};
    res.json(json_data);
})

// Import service controller
let serviceController = require('./controllers/serviceController');
// Service routes
router.route('/services')
    .get(serviceController.index)
    .post(serviceController.new);
router.route('/services/:service_id')
    .get(serviceController.view)
    .patch(serviceController.update)
    .put(serviceController.update)
    .delete(serviceController.delete);
;

var taskController = require('./controllers/taskController');
// Service routes
router.route('/tasks')
    .get(taskController.index)
    .post(taskController.new);
router.route('/tasks/:task_id')
    .get(taskController.view)
    .patch(taskController.update)
    .put(taskController.update)
    .delete(taskController.delete);
;
// Export API routes
module.exports = router;