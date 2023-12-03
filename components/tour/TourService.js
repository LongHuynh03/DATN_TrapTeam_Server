const tourModel = require("./TourModel");

// Lấy danh sách tour

const getAllTours = async (page, size) => {
  try {
    return await tourModel
      .find()
      .populate("province_id", "name")
      .populate("locations", "");
  } catch (error) {
    console.log("Get all tours servive ", error);
    throw error;
  }
};

module.exports = {
  getAllTours,
};
