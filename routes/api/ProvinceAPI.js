var express = require("express");
var router = express.Router();
const provinceController = require("../../components/province/ProvinceController");

//Lấy tất cả tỉnh thành
// http://localhost:3000/api/province/getAllProvinces

router.get("/getAllProvinces", async (req, res) => {
  try {
    const provinces = await provinceController.getAllProvinces();
    return res.status(200).json({
      result: true,
      provinces: provinces,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      provinces: [],
    });
  }
});

module.exports = router;
