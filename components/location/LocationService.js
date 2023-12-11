const locationModel = require("./LocationModel");

// Lấy danh sách địa điểm
const getAllLocations = async (page, size) => {
  try {
    return await locationModel
      .find({ is_popular: true })
      .populate("province_id", "");
  } catch (error) {
    console.log("Get all locations servive ", error);
    throw error;
  }
};

// Lấy địa điểm theo id
const getLocationById = async (location_id) => {
  try {
    return await locationModel
      .findById(location_id)
      .populate("province_id", "");
  } catch (error) {
    console.log("Get location by id servive ", error);
    throw error;
  }
};

// Lấy địa điểm theo province_id
const getLocationByProvinceId = async (province_id) => {
  try {
    return await locationModel
      .find({ province_id: province_id })
      .populate("province_id", "");
  } catch (error) {
    console.log("Get location by province id servive ", error);
    throw error;
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  getLocationByProvinceId,
};
