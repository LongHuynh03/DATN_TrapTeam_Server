const reviewService = require("./ReviewService");

// Lấy danh sách đánh giá

const getAllReviews = async (page, size) => {
  try {
    return await reviewService.getAllReviews(page, size);
  } catch (error) {
    console.log("Get all reviews controller ", error);
    throw error;
  }
};
// Thêm đánh giá cho tour

const addReview = async (user_id, tour_id, content) => {
  try {
    const addReview = await reviewService.addReview(
      user_id,
      tour_id,
      content,
    );
    if (addReview) {
      return addReview;
    }
    return null;
  } catch (error) {
    console.log("Thêm đánh giá không thành công: ", error);
    return false;
  }
};

// lấy danh sách đánh giá của tour
const getReviewByTour = async (tour_id) => {
  try {
    return await reviewService.getReviewByTour(tour_id);
  } catch (error) {
    console.log("Get all reviews servive ", error);
    throw error;
  }
};
module.exports = {
  getAllReviews,
  addReview,
  getReviewByTour,
};
