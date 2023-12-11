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
      locations: [],
    });
  }
});

//Lấy địa điểm theo id
// http://localhost:3000/api/location/getLocationById?location_id=
router.get("/getLocationById", async (req, res) => {
  try {
    const location_id = req.query.location_id;
    const location = await locationController.getLocationById(location_id);
    return res.status(200).json({
      result: true,
      location: location,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      location: {},
    });
  }
});

// Lấy địa điểm theo province_id
// http://localhost:3000/api/location/getLocationByProvinceId?province_id=

router.get("/getLocationByProvinceId", async (req, res) => {
  try {
    const province_id = req.query.province_id;
    const locations = await locationController.getLocationByProvinceId(
      province_id
    );
    return res.status(200).json({
      result: true,
      locations: locations,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      locations: [],
    });
  }
});

module.exports = router;
