const bookingtourService = require('./BookingTourService');

// Lấy danh sách tour đã đặt

const getAllBookingTours = async (page, size) => {
    try {
        return await bookingtourService.getAllBookingTours(page, size);
    } catch (error) {
        console.log('Get all booking tours controller ', error);
        throw error;
    }
};

module.exports = {
    getAllBookingTours,
};