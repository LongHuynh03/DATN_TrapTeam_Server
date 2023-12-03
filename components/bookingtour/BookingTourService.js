const bookingtourModel = require('./BookingTourModel');

// Lấy danh sách tour đã đặt

const getAllBookingTours = async (page, size) => {
    try {
        return await bookingtourModel.find()
            .populate("tour_id", "")
            .populate("user_id", "");
    } catch (error) {
        console.log('Get all booking tours servive ', error);
        throw error;
    }
};

module.exports = {
    getAllBookingTours,
};