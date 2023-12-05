const bookingtourModel = require("./BookingTourModel");

// Lấy danh sách tour đã đặt
const getAllBookingTours = async (page, size) => {
  try {
    return await bookingtourModel
      .find()
      .populate("tour_id", "")
      .populate("user_id", "");
  } catch (error) {
    console.log("Get all booking tours servive ", error);
    throw error;
  }
};

// Lấy danh sách tour đã đặt theo user
const getAllBookingToursByUser = async (user_id) => {
  try {
    return await bookingtourModel
      .find({ user_id: user_id })
      .populate("tour_id", "");
  } catch (error) {
    console.log("Get all booking tours servive ", error);
    throw error;
  }
};

module.exports = {
  getAllBookingTours,
  getAllBookingToursByUser,
};
