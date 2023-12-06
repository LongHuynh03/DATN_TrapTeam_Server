const reviewModel = require('./ReviewModel');

// Lấy danh sách đánh giá

const getAllReviews = async (page, size) => {
    try {
        return await reviewModel.find()
            .populate("tour_id", "")
            .populate("user_id", "");
    } catch (error) {
        console.log('Get all reviews servive ', error);
        throw error;
    }
};

// Thêm đánh giá cho tour
const addReview = async (user_id, tour_id, content,created_at) => {
    try {
        const newReview = {
            user_id,
            tour_id,
            content,
            created_at
        };
        const review = new reviewModel(newReview);
        await review.save();
        return true;
    } catch (error) {
        console.log("Thêm đánh giá cho tour service", error);
        return false;
    }
};
module.exports = {
    getAllReviews,
    addReview
};