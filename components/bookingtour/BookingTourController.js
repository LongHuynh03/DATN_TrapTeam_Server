const bookingtourService = require("./BookingTourService");

// Lấy danh sách tour đã đặt

const getAllBookingTours = async (page, size) => {
  try {
    return await bookingtourService.getAllBookingTours(page, size);
  } catch (error) {
    console.log("Get all booking tours controller ", error);
    throw error;
  }
};

// Lấy danh sách tour đã đặt theo user
const getAllBookingToursByUser = async (user_id) => {
  try {
    return await bookingtourService.getAllBookingToursByUser(user_id);
  } catch (error) {
    console.log("Get all booking tours controller ", error);
    throw error;
  }
};

// thêm bookingTour
const addBookingTour = async (tour_id, user_id, created_at, status, discount, note, guest_count, child_count, price) => {
  try {
    return await bookingtourService.addBookingTour(tour_id, user_id, created_at, status, discount, note, guest_count, child_count, price);
  } catch (error) {
    console.log("Add booking tour controller ", error);
    throw error;
  }
};
module.exports = {
  getAllBookingTours,
  getAllBookingToursByUser,
  addBookingTour,
};
