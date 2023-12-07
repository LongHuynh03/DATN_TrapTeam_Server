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

// thêm bookingTour
// http://localhost:3000/api/bookingtour/addBookingTour
router.post('/addBookingTour', async (req, res) => {
  try {
    const { tour_id, user_id, discount, note, guest_count, child_count, price } = req.body;
    const created_at = new Date();
    const status = true;
    const result = await bookingTourController.addBookingTour(
      tour_id,
      user_id,
      created_at,
      status,
      discount,
      note,
      guest_count,
      child_count,
      price);
    if (result) {
      return res.status(200).json({
        result: true,
        message: "Thêm bookingTour thành công",
      });
    }
    return res.status(200).json({
      result: false,
      message: "Thêm bookingTour thất bại",
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      message: error.message,
    });
  }
});
module.exports = router;
