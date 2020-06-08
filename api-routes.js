// Initialize express router
const router = require('express').Router()

/* GET home page. */

router.get('/', function (req, res) {
  const jsonData = { data: 'Main Page' }
  res.json(jsonData)
})

// Import service controller
const serviceController = require('./controllers/serviceController')
// Service routes
router.route('/services/trash')
  .get(serviceController.getTrash)
  .delete(serviceController.cleanTrash)
router.route('/services')
  .get(serviceController.index)
  .post(serviceController.new)
router.route('/services/:service_id')
  .get(serviceController.view)
  .patch(serviceController.update)
  .put(serviceController.update)
  .delete(serviceController.delete)

var taskController = require('./controllers/taskController')
// Task routes
router.route('/tasks/trash')
  .get(taskController.getTrash)
  .delete(taskController.cleanTrash)
router.route('/tasks')
  .get(taskController.index)
  .post(taskController.new)
router.route('/tasks/:task_id')
  .get(taskController.view)
  .patch(taskController.update)
  .put(taskController.update)
  .delete(taskController.delete)
router.route('/tasks/service_id/:service_id')
  .get(taskController.getByServiceId)

// Export API routes
module.exports = router
