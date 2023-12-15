var express = require("express");
var router = express.Router();

const reviewController = require("../../components/review/ReviewController");
// Lấy tất cả review
// http://localhost:3000/api/review/getAllReviews

router.get("/getAllReviews", async (req, res) => {
  try {
    const reviews = await reviewController.getAllReviews();
    return res.status(200).json({
      result: true,
      reviews: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      reviews: [],
    });
  }
});

// Thêm đánh giá cho tour
// http://localhost:3000/api/review/addReview
router.post("/addReview", async (req, res) => {
  try {
    const { user_id, tour_id, content } = req.body;

    const addReview = await reviewController.addReview(
      user_id,
      tour_id,
      content,
    );
    if (addReview) {
      return res.status(200).json({
        result: true,
        message: "Thêm đánh giá thành công",
        review: addReview,
      });
    }
    return res.status(400).json({
      result: false,
      message: "Thêm đánh giá không thành công",
      review: null,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      review: error.message,
    });
  }
});

// lấy danh sách đánh giá của tour

// http://localhost:3000/api/review/getReviewByTour?tour_id=
router.get("/getReviewByTour", async (req, res) => {
  try {
    const { tour_id } = req.query;
    const reviews = await reviewController.getReviewByTour(tour_id);
    return res.status(200).json({
      result: true,
      reviews: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      result: false,
      reviews: [],
    });
  }
});
module.exports = router;
