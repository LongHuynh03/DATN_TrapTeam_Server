var express = require("express");
var router = express.Router();

const tourController = require("../../components/tour/TourController");

//Lấy tất cả tour
// http://localhost:3000/api/tour/getAllTours

router.get("/getAllTours", async (req, res) => {
  try {
    const tours = await tourController.getAllTours();
    return res.status(200).json({
      result: true,
      tours: tours,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      tours: [],
    });
  }
});

// Lấy danh sách tour nổi bật ở trang chủ
// http://localhost:3000/api/tour/getTourHighlight
router.get("/getTourHighlight", async (req, res) => {
  try {
    const tours = await tourController.getTourHighlight();
    return res.status(200).json({
      result: true,
      tours: tours,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      tours: null,
      message: error.message,
    });
  }
});

// lấy danh sách tour có chứa địa điểm phổ biến
// http://localhost:3000/api/tour/getTourByLocation?location_id=
router.get("/getTourByLocation", async (req, res) => {
  try {
    const { location_id } = req.query;
    console.log("location_id: ", location_id);
    const tours = await tourController.getTourByLocation(location_id);
    return res.status(200).json({
      result: true,
      tours: tours,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      tours: null,
      message: error.message,
    });
  }
});

// Tìm kiếm tour theo tên
// http://localhost:3000/api/tour/getTourByName?name=
router.get("/getTourByName", async (req, res) => {
  try {
    const { name } = req.query;
    console.log("name: ", name);
    const tours = await tourController.getTourByName(name);
    return res.status(200).json({
      result: true,
      tours: tours,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      tours: null,
      message: error.message,
    });
  }
});

// Tìm kiếm tour theo filter http://localhost:3000/api/tour/getTourByFilter?departureLocation=&locationProvinces=&minPrice=&maxPrice=&is_popular=&dayFind
//

// http://localhost:3000/api/tour/getTourByFilter?locationProvinces=hồ chí minh&is_popular=false&minPrice=0&maxPrice=1000000&dayFind=06/02/2024

router.get("/getTourByFilter", async (req, res) => {
  try {
    const {
      departureLocation,
      locationProvinces,
      minPrice,
      maxPrice,
      is_popular,
      dayFind,
    } = req.query;

    const tours = await tourController.getTourByFilter(
      departureLocation,
      locationProvinces,
      minPrice,
      maxPrice,
      is_popular,
      dayFind
    );
    return res.status(200).json({
      result: true,
      tours: tours,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      tours: null,
      message: error.message,
    });
  }
});

// Lấy danh sách tour theo id tỉnh
// http://localhost:3000/api/tour/getTourByProvinceId?province_id=

router.get("/getTourByProvinceId", async (req, res) => {
  try {
    const { province_id } = req.query;
    console.log("province_id: ", province_id);
    const tours = await tourController.getTourByProvinceId(province_id);
    return res.status(200).json({
      result: true,
      tours: tours,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      tours: null,
      message: error.message,
    });
  }
});

// Lấy tour theo id và lấy danh sách địa điểm của tour đó
// http://localhost:3000/api/tour/getTourByIdAndLocations?tour_id=

router.get("/getTourByIdAndLocations", async (req, res) => {
  try {
    const { tour_id } = req.query;
    const tour = await tourController.getTourByIdAndLocations(tour_id);
    return res.status(200).json({
      result: true,
      tour: tour,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      tour: null,
      message: error.message,
    });
  }
});

module.exports = router;
