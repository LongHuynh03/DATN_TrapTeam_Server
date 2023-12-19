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

const getPriceByMonth = async () => {
  try {
	const month = new Date().getMonth() + 1;
	const year = new Date().getFullYear();
	let day = 31;
  let listPrice = [];
	switch (month) {
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
			day = 31;
			break;
		case 2:
			if ((year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 === 0)) {
				day = 29;
			}
			else {
				day = 28;
			}
			break;
		case 4:
		case 6:
		case 9:
		case 11:
			day = 30;
			break;
		default:
			day = 31;
			break;
	}
	for (let index = 1; index <= day; index++) {
		const bookings = await bookingTourController.getAllBookingToursByDay(index, month, year);
		let totalPrice = 0;
		const total = await bookings.forEach(element => {
			totalPrice += element.price
		});
		listPrice.push(totalPrice);
	}
  // console.log(listPrice);
  return listPrice;
  } catch (error) {
    console.log("Get price by month error: " + error);
    throw error;
  }
}

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
    const chartPrice = await getPriceByMonth();
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

    res.render('index', { newTotalPrice, numberAccounts, numberTours, numberToursActive, numberToursFinish , chartPrice});
  } catch (error) {
    console.log("Get all user cpanel error: " + error)
    throw error;
  }
  

});
module.exports = router;
