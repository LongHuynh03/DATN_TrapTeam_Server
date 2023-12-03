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

module.exports = router;
