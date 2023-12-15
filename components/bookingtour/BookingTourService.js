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

// Lấy danh sách tour đã đặt theo mặc định
const getAllBookingToursByDefault = async (tour_id) => {
  try {
    return await bookingtourModel
      .find({ tour_id: tour_id, role: false })
      .populate("tour_id", "")
      .populate("user_id", "");
  } catch (error) {
    console.log("Get all booking tours servive ", error);
    throw error;
  }
};

// Lấy danh sách tour đã đặt theo mặc định
const getAllBookingToursBy = async (tour_id) => {
  try {
    return await bookingtourModel
      .find({ tour_id: tour_id, role: false })
      .populate("tour_id", "")
      .populate("user_id", "");
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
  created_at,
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
      created_at,
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

module.exports = {
  getAllBookingTours,
  getAllBookingToursByUser,
  getAllBookingToursByTour,
  addNewBookingTour,
};
