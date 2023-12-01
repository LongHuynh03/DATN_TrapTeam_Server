const locationModel = require("./LocationModel");

// Lấy danh sách địa điểm
const getAllLocations = async (page, size) => {
  try {
    return await locationModel.find().populate("province_id", "name");
  } catch (error) {
    console.log("Get all locations servive ", error);
    throw error;
  }
};

module.exports = {
  getAllLocations,
};
