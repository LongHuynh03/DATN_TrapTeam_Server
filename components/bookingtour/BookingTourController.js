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

// Đặt tour
const addNewBookingTour = async (
  user_id,
  tour_id,
  discount,
  created_at,
  adult_count,
  child_count,
  price,
  note,
  role,
  location_custom
) => {
  try {
    return await bookingtourService.addNewBookingTour(
      user_id,
      tour_id,
      discount,
      created_at,
      adult_count,
      child_count,
      price,
      note,
      role,
      location_custom
    );
  } catch (error) {
    console.log("Add new booking tour controller ", error);
    throw error;
  }
};

// lấy danh sach tour theo tour_id và role
const getAllBookingToursByTourId = async (tour_id) => {
  try {
    return await bookingtourService.getAllBookingToursByTourId(
      tour_id,
    );
  } catch (error) {
    console.log("Get all booking tours controller ", error);
    throw error;
  }
};

module.exports = {
  getAllBookingTours,
  getAllBookingToursByUser,
  addNewBookingTour,
  getAllBookingToursByTourId
};
