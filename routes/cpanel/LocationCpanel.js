var express = require('express');
var router = express.Router();
const locationController = require('../../components/location/LocationController');
const provinceController = require('../../components/province/ProvinceController');


//Lấy danh sách địa điểm
router.get('/', async function (req, res, next) {
  try {
    const locations = await locationController.getAllLocations();
    res.render("location/list", { locations });
  } catch (error) {
    console.log("Get all location cpanel error: " + error);
    throw error;
  }
});

// Lấy danh sách tỉnh đổ vào địa điểm, thêm địa điểm (GET)
router.get('/add', async function (req, res, next) {
  try {
    const provinces = await provinceController.getAllProvinces();
    res.render("location/list", { provinces });
  } catch (error) {
    console.log("Get add location cpanel error: " + error);
    throw error;
  }
});

//Thêm địa điểm (POST )
router.post('/add', async function (req, res, next) {
  try {
    let { body, file } = req;
    let { name, province_id, description, image, is_popular } = body;
    await locationController.createLocation(name, province_id, description, image, is_popular);
    res.render('location/list');
  } catch (error) {
    console.log("Post location cpanel error: " + error);
    throw error;
  }
});

//Lấy chi tiết địa điểm
router.get('/:id/detail', async function (req, res, next) {
  try {
    let { id } = req.params;
    console.log(id)
    const provinces = await provinceController.getAllProvinces();
    const location = await locationController.getLocation(id);
    res.render("location/add", { provinces, location });
  } catch (error) {
    console.log("Get edit location cpanel error: " + error);
    throw error;
  }
});

// Xóa địa điểm
router.get('/:id/delete', async function (req, res, next) {
  try {
    let { id } = req.params;
    await locationController.deleteLocation(id);
    return res.json({ status: true });
  } catch (error) {
    console.log("Delete location cpanel error: " + error);
    return res.json({ status: false });
  }
});

// Cập nhật địa điểm phổ biến
router.get('/:id/popular', async function (req, res, next) {
  try {
    let { id } = req.params;
    let { is_popular } = req.body;
    await locationController.popularLocation(id, is_popular);
    return res.json({ status: true });
  } catch (error) {
    console.log("Popular location cpanel error: " + error);
    return res.json({ status: false });
  }
});


module.exports = router;