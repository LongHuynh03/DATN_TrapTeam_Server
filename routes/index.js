var express = require("express");
var router = express.Router();
const userController = require("../components/account/AccountController");
const eventController = require("../components/event/EventController");
const tourController = require("../components/tour/TourController");
const locationController = require("../components/location/LocationController");
const provinceController = require("../components/province/ProvinceController");
const bookingTourController = require("../components/bookingtour/BookingTourController");
const blogController = require("../components/blogs/BlogController");
const auth = require('../midle/Authen');
const jwt = require('jsonwebtoken');
const adminController = require("../components/admin/AdminController");

/* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

router.get("/login",[auth.authenWeb], function (req, res, next) {
  res.render("login", { title: "Express" });
});

router.post("/login",[auth.authenWeb],async function (req, res, next) {
  const { account, password } = req.body;
    const result = await adminController.getAccount(account, password);
    if (result) {
      const token = jwt.sign({account, password}, 'secret');
      req.session.token = token;
      return res.redirect("/");
    }
    else {
      return res.redirect("/login");
    }
});

router.get(
  '/logout',
  [auth.authenWeb],
  async function (req, res, next) {
    req.session.destroy();
    res.redirect('/login');
  },
);

router.get("/test", function (req, res, next) {
  res.render("test", { title: "Express" });
});

router.get('/',[auth.authenWeb],async function (req, res, next) {
  try {
    const bookings = await bookingTourController.getAllBookingTours();
    let totalPrice = 0;
    const total = bookings.forEach(element => {
      totalPrice += element.price
    });

    const newTotalPrice = totalPrice.toLocaleString('vi-VN');

    const accountCount = await userController.getAllAccounts();
    let numberAccounts = accountCount.length;

    const tours = await tourController.getAllTours();
    let numberTours = tours.length;

    let numberToursActive = 0;
    const tourActive = tours.forEach(element => {
      if (element.status){
        numberToursActive += 1;
      }
    });

    let numberToursFinish = 0;
    const tourFinish = tours.forEach(element => {
      if (!element.status){
        numberToursFinish += 1;
      }
    });

    res.render('index', { newTotalPrice, numberAccounts, numberTours, numberToursActive, numberToursFinish });
  } catch (error) {
    console.log("Get all user cpanel error: " + error)
    throw error;
  }
  

});
module.exports = router;
