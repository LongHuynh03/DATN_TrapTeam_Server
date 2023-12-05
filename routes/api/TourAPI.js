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

// Tìm kiếm tour theo filter
// http://localhost:3000/api/tour/getTourByFilter?locationProvinces=&locationCountry=&minPrice=&maxPrice=&is_popular=

router.get("/getTourByFilter", async (req, res) => {
  try {
    const {
      locationProvinces,
      locationCountry,
      minPrice,
      maxPrice,
      is_popular,

      dayFind,
    } = req.query;
    console.log("locationProvinces: ", locationProvinces);
    console.log("locationCountry: ", locationCountry);
    console.log("minPrice: ", minPrice);
    console.log("maxPrice: ", maxPrice);
    console.log("is_popular: ", typeof is_popular);
    console.log("dayFind: ", dayFind);

    const dateParts = dayFind.split('/');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const year = parseInt(dateParts[2], 10);
    const date = new Date(year, month, day);

    const tours = await tourController.getTourByFilter(
      locationProvinces,
      locationCountry,
      minPrice,
      maxPrice,
      is_popular,
      date
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

module.exports = router;
