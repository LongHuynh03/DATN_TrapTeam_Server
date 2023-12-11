const locationService = require("./LocationService");
//Lấy tất cả địa điểm
const getAllLocations = async (page, size) => {
  try {
    return await locationService.getAllLocations(page, size);
  } catch (error) {
    console.log("Get all locations controller ", error);
    throw error;
  }
};

//Lấy địa điểm theo id
const getLocationById = async (location_id) => {
  try {
    return await locationService.getLocationById(location_id);
  } catch (error) {
    console.log("Get location by id controller ", error);
    throw error;
  }
};

// Lấy địa điểm theo province_id
const getLocationByProvinceId = async (province_id) => {
  try {
    return await locationService.getLocationByProvinceId(province_id);
  } catch (error) {
    console.log("Get location by province id controller ", error);
    throw error;
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  getLocationByProvinceId,
};
