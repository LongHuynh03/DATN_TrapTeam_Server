var express = require("express");
var router = express.Router();
const locationController = require("../../components/location/LocationController");

//Lấy tất cả địa điểm
// http://localhost:3000/api/location/getAllLocations

router.get("/getAllLocations", async (req, res) => {
  try {
    const locations = await locationController.getAllLocations();
    return res.status(200).json({
      result: true,
      locations: locations,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      locations: null,
    });
  }
});

module.exports = router;
