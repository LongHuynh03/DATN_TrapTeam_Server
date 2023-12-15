var express = require('express');
var router = express.Router();
const tourController = require('../../components/tour/TourController');
const locationController = require('../../components/location/LocationController');
const provinceController = require('../../components/province/ProvinceController');
const bookingTourController = require('../../components/bookingtour/BookingTourController');

// //Lấy danh sách tour
// router.get('/', async function (req, res, next) {
//   try {
//     const tours = await tourController.getAllTours();
//     res.render('tour/list', { tours })
//   } catch (error) {
//     console.log("Get all tour cpanel error: " + error);
//     throw error;
//   }
// });

// // Lấy danh sách địa điểm, tỉnh đổ vào tour, thêm tour (GET)
// router.get('/create', async function (req, res, next) {
//   try {
//     const provinces = await provinceController.getAllProvinces();
//     const location = await locationController.getAllLocations();
//     res.render('tour/list', { provinces, location });
//   } catch (error) {
//     console.log("Get create tour cpanel error: " + error);
//     throw error;
//   }
// });

// // Thêm tour (POST) (Chưa xong)
// router.post('/create', async function (req, res, next) {
//   try {
//     const provinces = await provinceController.getAllProvinces();
//     const location = await locationController.getAllLocations();
//     res.render('tour/list', { provinces, location });
//   } catch (error) {
//     console.log("Get create tour cpanel error: " + error);
//     throw error;
//   }
// });

// // Xem chi tiết tour (có danh sách hóa booking tour)
// router.get('/:id/detailTour', async function (req, res, next) {
//   try {
//     let { id } = req.params;
//     const tour = await tourController.getTourByIdAndLocations(id);
//     const bookingTour = await bookingTourController.getAllBookingToursByTour(id);
//     res.render('tour/list', { tour, bookingTour });
//   } catch (error) {
//     console.log("Get create tour cpanel error: " + error);
//     throw error;
//   }
// });

// // Thay đổi trạng thái tour
// router.get('/:id/statusTour', async function (req, res, next) {
//   try {
//     let { id } = req.params;
//     const tour = await tourController.getTourByIdAndLocations(id);
//     res.render('tour/list', { tour, bookingTour });
//   } catch (error) {
//     console.log("Get create tour cpanel error: " + error);
//     throw error;
//   }
// });

// // Thay đổi trạng thái tour
// router.post('/:id/statusTour', async function (req, res, next) {
//   try {
//     const { tour_id } = req.params;
//     const { status } = req.params;
//     await tourController.changeStatus(tour_id, status);
//     res.render('tour/list', { tour, bookingTour });
//   } catch (error) {
//     console.log("Change status tour cpanel error: " + error);
//     throw error;
//   }
// });

// // Tour nổi bật
// router.get('/:id/popular', async function (req, res, next) {
//   try {
//     let { id } = req.params;
//     let { is_popular } = req.body;
//     await tourController.popularTour(id, is_popular);
//     return res.json({ status: true });
//   } catch (error) {
//     console.log("Popular tour cpanel error: " + error);
//     return res.json({ status: false });
//   }
// });

module.exports = router;