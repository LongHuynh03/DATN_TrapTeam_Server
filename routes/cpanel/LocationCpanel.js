var express = require('express');
var router = express.Router();

//Lấy danh sách địa điểm
router.get('/', function(req, res, next) {
    res.render('guest/list');
  });

// Lấy danh sách tỉnh đổ vào địa điểm, thêm địa điểm (GET)

//Thêm địa điểm (POST )

//Lấy chi tiết địa điểm

// Thay đổi trạng thái địa điểm


module.exports = router;