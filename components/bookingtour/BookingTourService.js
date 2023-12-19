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

// Lấy danh sách tour đã đặt theo ngày
const getAllBookingToursByDay = async (day, month, year) => {
  try {
    if (day < 10) {
      day = "0" + day;
    }
    let dayFind = year + "-" + month + "-" + day;
    let test1 = "" + dayFind + "T00:00:00.000Z";
    let test2 = "" + dayFind + "T23:59:00.000Z"
    let ngayKhoiHanhISO1 = new Date(test1).toISOString();
    let ngayKhoiHanhISO2 = new Date(test2).toISOString();

    return await bookingtourModel
      // .aggregate(
      //   [
      //     {
      //       $group: {
      //         _id: "$created_at",
      //         Total_price: { $sum: "$price" },
      //       }
      //     }
      //   ]
      // );
    .find({$and:[{'created_at': {$gte: ngayKhoiHanhISO1 , $lte: ngayKhoiHanhISO2}}]})

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
    return bookingtourModel.findById(bookingtour._id).populate("tour_id", "").populate("location_custom", "");
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
  getAllBookingToursByDay
};
