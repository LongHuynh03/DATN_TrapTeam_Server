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

module.exports = {
    getAllReviews,
};