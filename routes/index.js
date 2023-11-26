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

router.get('/tours', function(req, res, next) {
  res.render('tour/list', { title: 'Express' });
});

router.get('/detailTour', function(req, res, next) {
  res.render('tour/edit', { title: 'Express' });
});

router.get('/addTour', function(req, res, next) {
  res.render('tour/add', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
  res.render('test', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/event', function(req, res, next) {
  res.render('event/list', { title: 'Express' });
});

router.get('/addEvent', function(req, res, next) {
  res.render('event/add', { title: 'Express' });
});

router.get('/bill', function(req, res, next) {
  res.render('bill', { title: 'Express' });
});

router.get('/blogs', function(req, res, next) {
  res.render('blogs', { title: 'Express' });
});

router.get('/review', function(req, res, next) {
  res.render('review', { title: 'Express' });
});

module.exports = router;
