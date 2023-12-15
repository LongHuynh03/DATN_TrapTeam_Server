var express = require('express');
var router = express.Router();
const userController = require('../components/account/AccountController');
const eventController = require('../components/event/EventController');
const tourController = require('../components/tour/TourController');
const locationController = require('../components/location/LocationController');
const provinceController = require('../components/province/ProvinceController');
const bookingTourController = require('../components/bookingtour/BookingTourController');
const blogController = require('../components/blogs/BlogController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});


/* USER */

//List
router.get('/users', async function (req, res, next) {
  try {
    const users = await userController.getAllAccounts();
    res.render('guest/list', { users });
  } catch (error) {
    console.log("Get all user cpanel error: " + error)
    throw error;
  }
});

/* LOCATIONS */

//List 
router.get('/locations', async function (req, res, next) {
  try {
    const locations = await locationController.getAllLocations();
    res.render("location/list", { locations });
  } catch (error) {
    console.log("Get all location cpanel error: " + error);
    throw error;
  }
});

router.get('/addLocation', async function (req, res, next) {
  try {
    const provinces = await provinceController.getAllProvinces();
    res.render("location/add", { provinces });
  } catch (error) {
    console.log("Get add location cpanel error: " + error);
    throw error;
  }
});

router.post('/addLocation', async function (req, res, next) {
  try {
    let { body, file } = req;
    let { name, province_id, description, image } = body;
    console.log("????????? Name: " + name);
    console.log("????????? Province: " + province_id);
    console.log("????????? Des: " + description);
    console.log("????????? Image: " + image);
    await locationController.createLocation(name, province_id, description, 'https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png', false);
    res.redirect('/locations');
  } catch (error) {
    console.log("Post location cpanel error: " + error);
    throw error;
  }
});

router.get('/location/:id/deleted', async function (req, res, next) {
  try {
    const { id } = req.params;
    console.log(id)
    await locationController.deleteLocation(id);
    return res.json({ status: true });
  } catch (error) {
    return res.json({ status: false });
  }

})

/* TOUR */

router.get('/tours', async function (req, res, next) {
  try {
    const tours = await tourController.getAllTours();
    res.render('tour/list', { tours })
  } catch (error) {
    console.log("Get all tour cpanel error: " + error);
    throw error;
  }
});

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

router.get('/addTour', async function (req, res, next) {
  try {
    const provinces = await provinceController.getAllProvinces();
    const locations = await locationController.getAllLocations();
    res.render('tour/add', { provinces, locations });
  } catch (error) {
    console.log("Get create tour cpanel error: " + error);
    throw error;
  }
});

// // Thêm tour (POST) (Chưa xong)
router.post('/addTour', async function (req, res, next) {
  try {
    let { body, file } = req;
    let { name, price, member, } = body;
    res.render('tour/list', { provinces, locations });
  } catch (error) {
    console.log("Get create tour cpanel error: " + error);
    throw error;
  }
});


/* EVENT */

//List
router.get('/events', async function (req, res, next) {
  try {
    const events = await eventController.getAllEvents();
    res.render('event/list', { events });
  } catch (error) {
    console.log("Get all event cpanel: ", error);
    throw error;
  }
});

//  Lấy danh sách location thêm vào event
router.get('/addEvent', async function (req, res, next) {
  try {
    const provinces = await provinceController.getAllProvinces();
    res.render('event/add', { provinces });
  } catch (error) {
    console.log("Get add event cpanel: ", error);
    throw error;
  }
});

// Thêm event
router.post('/addEvent', async function (req, res, next) {
  try {
    let { body, file } = req;
    let { title, province_id, image } = body;
    await eventController.createEvent(title, province_id, 'https://cdn.sforum.vn/sforum/wp-content/uploads/2018/11/2-10.png');
    res.redirect('/events');
  } catch (error) {
    console.log("Post add event cpanel: ", error);
    throw error;
  }
});

// Xóa event
router.get('/event/:id/deleted', async function (req, res, next) {
  try {
    const { id } = req.params;
    await eventController.deleteEvent(id);
    return res.json({ status: true });
  } catch (error) {
    return res.json({ status: false });
  }
})

/*BLOG */

//List 
router.get('/blogs', async function (req, res, next) {
  try {
    const blogs = await blogController.getAllBlogs();
    res.render('blogs', { blogs });
  } catch (error) {
    console.log("Get all blog cpanel: ", error);
    throw error;
  }
});

// //Thay đổi trạng thái blogs
router.get('/blog/:id?a/change', async function (req, res, next) {
    try {
        const { id, a } = req.params;
        console.log("///////id" + id);
        console.log("///////a" + a);
        // const { status } = req.params;
        // await blogController.changeStatus(blog_id, status);
        return res.json({ status: true });
    } catch (error) {
        console.log("Change status blog cpanel: ", error);
        return res.json({ status: false });
    }
});


module.exports = router;
