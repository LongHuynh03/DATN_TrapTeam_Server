var express = require('express');
var router = express.Router();
const tourController = require('../../components/tour/TourController');
const locationController = require('../../components/location/LocationController');
const provinceController = require('../../components/province/ProvinceController');

//Lấy danh sách tour
router.get('/', async function(req, res, next) {
    try {
      const tours = await tourController.getAllTours();
      res.render('tour/list', {tours})
    } catch (error) {
      console.log("Get all tour cpanel error: " + error);
      throw error;
    }
  });

// Lấy danh sách địa điểm, tỉnh đổ vào tour, thêm tour (GET)

// Thêm tour (POST)

// Xem chi tiết tour (có danh sách hóa booking tour)

// Thay đổi trạng thái tour

// Tour nổi bật

module.exports = router;