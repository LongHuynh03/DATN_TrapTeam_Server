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
    console.log("ID: " + id);
    const query_tour = await tourController.getTourByIdAndLocations(id);
    const tour = {
      _id: query_tour._id,
      province_id: {
        _id: query_tour.province_id._id,
        name: query_tour.province_id.name,
        image: query_tour.province_id.image,
      },
      image: query_tour.image,
      name: query_tour.name,
      description: query_tour.description,
      price: query_tour.price,
      departure_date: formatDateString(query_tour.departure_date),
      departure_location: query_tour.departure_location,
      end_date: formatDateString(query_tour.end_date),
      status: query_tour.status,
      is_popular: query_tour.is_popular,
      schedules: query_tour.schedules,
      locations: query_tour.locations, 
      created_at: formatDateString(query_tour.created_at),
      }

    
    const query = await bookingTourController.getAllBookingToursByTour(id);
      quantity = 0;
      query.forEach((bookingTour) => {
        if(bookingTour.role == false){ quantity += bookingTour.adult_count + bookingTour.child_count;}
       
      });

    console.log("quantity: " + quantity);
    const bookings = query.map(booking => {
      return {
        _id: booking._id,
        user_id: {
          _id: booking.user_id._id,
          phone_number: booking.user_id.phone_number,
          name: booking.user_id.name,
          email: booking.user_id.email,
          avatar: booking.user_id.avatar,
          created_at: formatDateString(booking.user_id.created_at),
          __v: booking.user_id.__v,
        },
        tour_id: {
          _id: booking.tour_id._id,
          province_id: booking.tour_id.province_id,
          name: booking.tour_id.name,
          description: booking.tour_id.description,
          available_seats: booking.tour_id.available_seats,
          image: booking.tour_id.image,
          price: booking.tour_id.price,
          departure_date: formatDateString(booking.tour_id.departure_date),
          departure_location: booking.tour_id.departure_location,
          end_date: formatDateString(booking.tour_id.end_date),
          status: booking.tour_id.status,
          is_popular: booking.tour_id.is_popular,
          schedules: booking.tour_id.schedules,
          locations: booking.tour_id.locations,
        },
        discount: booking.discount,
        created_at: formatDateString(booking.created_at),
        adult_count: booking.adult_count,
        child_count: booking.child_count,
        price: booking.price,
        note: booking.note,
        role: booking.role,
        location_custom: booking.location_custom,
        __v: booking.__v,
      }
    });
    res.render('tour/edit', {tour, bookings, quantity});
  } catch (error) {
    console.log("Detail tour cpanel error: " + error);
    throw error;
  }
});

module.exports = router;