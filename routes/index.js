var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/listUser', function(req, res, next) {
  res.render('guest/list', { title: 'Express' });
});

router.get('/detailUser', function(req, res, next) {
  res.render('guest/detail', { title: 'Express' });
});

router.get('/estate', function(req, res, next) {
  res.render('estate/list', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/review', function(req, res, next) {
  res.render('review', { title: 'Express' });
});

module.exports = router;
