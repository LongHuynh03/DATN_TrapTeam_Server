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

module.exports = {
    getAllReviews,
};