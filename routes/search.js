var express = require('express');
var router = express.Router();

/* Addition home page. */
router.get('/', function (req, res, next) {
  res.render('search', {
    title: 'Route berechnen'
  });
});

module.exports = router;