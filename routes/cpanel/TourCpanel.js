var express = require('express');
var router = express.Router();

//Lấy danh sách tour
router.get('/', function(req, res, next) {
    res.render('guest/list');
  });

// Lấy danh sách địa điểm, tỉnh đổ vào tour, thêm tour (GET)

// Thêm tour (POST)

// Xem chi tiết tour (có danh sách hóa booking tour)

// Thay đổi trạng thái tour

// Tour nổi bật

module.exports = router;