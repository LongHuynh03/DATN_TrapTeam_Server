const reviewModel = require("./ReviewModel");

// Lấy danh sách đánh giá

const getAllReviews = async (page, size) => {
  try {
    return await reviewModel
      .find()
      .populate("tour_id", "")
      .populate("user_id", "");
  } catch (error) {
    console.log("Get all reviews servive ", error);
    throw error;
  }
};

// Thêm đánh giá cho tour
const addReview = async (user_id, tour_id, content) => {
  try {
    const newReview = {
      user_id,
      tour_id,
      content,
    };
    const review = new reviewModel(newReview);
    await review.save();
    return true;
  } catch (error) {
    console.log("Thêm đánh giá cho tour service", error);
    return false;
  }
};

// lấy danh sách đánh giá của tour
const getReviewByTour = async (tour_id) => {
  try {
    return await reviewModel
      .find({ tour_id: tour_id })
      .populate("user_id", "name avatar");
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
