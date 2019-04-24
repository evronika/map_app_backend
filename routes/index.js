// Initialize express router
let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.js.js.js.js.js', { title: 'Express :) Hurray!..', name: "Index" });
});



module.exports = router;
