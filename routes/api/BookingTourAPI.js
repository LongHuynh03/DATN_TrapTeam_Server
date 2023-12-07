const express = require("express");
const router = express.Router();

const bookingTourController = require("../../components/bookingtour/BookingTourController");

// Lấy tất cả bookingTour
// http://localhost:3000/api/bookingtour/getAllBookingTours

router.get("/getAllBookingTours", async (req, res) => {
  try {
    const bookingTours = await bookingTourController.getAllBookingTours();
    return res.status(200).json({
      result: true,
      bookingTours: bookingTours,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      bookingTours: [],
    });
  }
});

// Lấy tất cả bookingTour theo user
// http://localhost:3000/api/bookingtour/getAllBookingToursByUser?user_id=

router.get("/getAllBookingToursByUser", async (req, res) => {
  try {
    const bookingTours = await bookingTourController.getAllBookingToursByUser(
      req.query.user_id
    );
    return res.status(200).json({
      result: true,
      bookingTours: bookingTours,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      bookingTours: [],
    });
  }
});

// Đặt tour
// http://localhost:3000/api/bookingtour/addNewBookingTour

router.post("/addNewBookingTour", async (req, res) => {
  try {
    const {
      user_id,
      tour_id,
      discount,
      adult_count,
      child_count,
      price,
      note,
      location_custom,
    } = req.body;
    const created_at = new Date();
    let role = false; // false: tour mặc định, true: tour tùy chọn
    if (location_custom.length > 0) {
      role = true;
    }

    const bookingTour = await bookingTourController.addNewBookingTour(
      user_id,
      tour_id,
      discount,
      created_at,
      adult_count,
      child_count,
      price,
      note,
      role,
      location_custom
    );

    if (bookingTour) {
      return res.status(200).json({
        result: true,
        message: "Đặt tour thành công",
        bookingTour: bookingTour,
      });
    }

    return res.status(400).json({
      result: false,
      message: "Đặt tour thất bại",
      bookingTour: {},
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      bookingTour: {},
    });
  }
});

module.exports = router;
