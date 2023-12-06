const reviewService = require('./ReviewService');

// Lấy danh sách đánh giá

const getAllReviews = async (page, size) => {
    try {
        return await reviewService.getAllReviews(page, size);
    } catch (error) {
        console.log('Get all reviews controller ', error);
        throw error;
    }
};
// Thêm đánh giá cho tour

const addReview = async (user_id, tour_id, content,created_at ) => {
    try {
      const addReview = await reviewService.addReview(
        user_id, tour_id, content,created_at
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
module.exports = {
    getAllReviews,
    addReview
};