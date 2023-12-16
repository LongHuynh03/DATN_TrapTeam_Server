var express = require('express');
var router = express.Router();
const tourController = require('../../components/tour/TourController');
const locationController = require('../../components/location/LocationController');
const provinceController = require('../../components/province/ProvinceController');
const bookingTourController = require('../../components/bookingtour/BookingTourController');
const moment = require('moment');


function formatDateString(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? '0' : ''}${day}/${month < 10 ? '0' : ''}${month}/${year}`;
}
// //Lấy danh sách tour
router.get('/', async function (req, res, next) {
  try {
    const query = await tourController.getAllTours();
    const tours = query.map(tour => {
      return {
        _id: tour._id,
        province_id: {
          _id: tour.province_id._id,
          name: tour.province_id.name,
          image: tour.province_id.image,
        },
        image: tour.image,
        name: tour.name,
        description: tour.description,
        price: tour.price,
        departure_date: formatDateString(tour.departure_date),
        departure_location: tour.departure_location,
        end_date: formatDateString(tour.end_date),
        status: tour.status,
        is_popular: tour.is_popular,
        schedules: tour.schedules,
        locations: tour.locations, 
        created_at: formatDateString(tour.created_at),
        }
      
    });
    console.log(tours);
    res.render('tour/list', { tours })
  } catch (error) {
    console.log("Get all tour cpanel error: " + error);
    throw error;
  }
});

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

// THÊM TOUR
router.get('/add-tour', async function (req, res, next) {
  try {
    const provinces = await provinceController.getAllProvinces();
    const locations = await locationController.getAllLocations();
    res.render('tour/add', { provinces, locations });
  } catch (error) {
    
  }
});

router.post('/add-tour', async function (req, res, next) {
  try {
    let { body } = req;
    let { name_tour, price_tour, quantity, departure_start, departure_end, day_start, day_end, description_tour,  locations_tour, dataArray, imgUrl,  } = body;
    const dayStart = moment(day_start).format('DD/MM/YYYY');
    const dayEnd = moment(day_end).format('DD/MM/YYYY');

    const departureDate = moment(dayStart, 'DD/MM/YYYY').toDate();
    const endDate = moment(dayEnd, 'DD/MM/YYYY').toDate();


    const province_id = departure_start;
    const name = name_tour;
    const description = description_tour;
    const available_seats = quantity;
    const image = imgUrl;
    const price = price_tour;
    const departure_date = departureDate;
    const departure_location = departure_end;
    const end_date = endDate;
    const schedules = dataArray;
    const locations = locations_tour

    console.log("????????? Province: " + province_id);
    console.log("????????? Name: " + name);
    console.log("????????? Des: " + description);
    console.log("????????? Available: " + available_seats);
    console.log("????????? Image: " + image);
    console.log("????????? Price: " + price);
    console.log("????????? Departure: " + departure_date);
    console.log("????????? Departure location: " + departure_location);
    console.log("????????? End date: " + end_date);
    console.log("????????? Schedules: " + schedules);
    console.log("????????? Locations: " + locations);

  
    await tourController.createTour(province_id, name, description, available_seats, image, price, departure_date, departure_location, end_date, schedules, locations);
    res.redirect('/cpanel/tours');
   
  } catch (error) {
    console.log("Post location cpanel error: " + error);
    throw error;
  }
});

// Cập nhật nổi bật tour
router.post("/:id/popular/:is_popular", async function (req, res, next) {
  try {
    let { id, is_popular } = req.params;
    await tourController.popularTour(id, is_popular);
    return res.json({ status: true });
  } catch (error) {
    console.log("Popular tour cpanel error: " + error);
    return res.json({ status: false });
  }
});

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

router.get('/:id', async function (req, res, next) {
  try {
    const { id} = req.params;
    const tour = await tourController.getTourByIdAndLocations(id);
    const bookings = await bookingTourController.getAllBookingToursByTour(id);
    res.render('tour/edit', { tour, bookings });
  } catch (error) {
    console.log("Detail tour cpanel error: " + error);
    throw error;
  }
});

module.exports = router;