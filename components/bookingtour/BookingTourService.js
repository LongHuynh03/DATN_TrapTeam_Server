const bookingtourModel = require("./BookingTourModel");

// Lấy danh sách tour đã đặt
const getAllBookingTours = async (page, size) => {
  try {
    return await bookingtourModel
      .find()
      .populate("tour_id", "")
      .populate("user_id", "")
      .populate("location_custom", "");
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
      .populate({ path: "tour_id", populate: { path: "province_id" } })
      .sort({ created_at: -1 });
  } catch (error) {
    console.log("Get all booking tours servive ", error);
    throw error;
  }
};

// Lấy danh sách tour đã đặt theo Id tour
const getAllBookingToursByTour = async (tour_id) => {
  try {
    return await bookingtourModel
      .find({ tour_id: tour_id })
      .populate("tour_id", "")
      .populate("user_id", "")
      .populate("location_custom", "");
  } catch (error) {
    console.log("Get all booking tours servive ", error);
    throw error;
  }
};

// Đặt tour
const addNewBookingTour = async (
  user_id,
  tour_id,
  discount,
  adult_count,
  child_count,
  price,
  note,
  role,
  location_custom
) => {
  try {
    const newBookingTour = {
      user_id,
      tour_id,
      discount,
      adult_count,
      child_count,
      price,
      note,
      role,
      location_custom,
    };
    const bookingtour = new bookingtourModel(newBookingTour);
    await bookingtour.save();
    return bookingtourModel.findById(bookingtour._id).populate("tour_id", "");
  } catch (error) {
    console.log("Add new booking tour service ", error);
    throw error;
  }
};

// Lấy danh sách tour đã đặt theo tour_id và role: false: mặc định
const getAllBookingToursByTourId = async (tour_id) => {
  try {
    return await bookingtourModel.find({ tour_id: tour_id, role: false });
  } catch (error) {
    console.log("Get all booking tours servive ", error);
    throw error;
  }
};

module.exports = {
  getAllBookingTours,
  getAllBookingToursByUser,
  getAllBookingToursByTour,
  addNewBookingTour,
  getAllBookingToursByTourId,
};
