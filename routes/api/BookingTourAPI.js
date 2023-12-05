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

module.exports = router;
