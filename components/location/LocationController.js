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


const getAllLocations_web = async (page, size) => {
  try {
    return await locationService.getAllLocations_web(page, size);
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

const createLocation = async (name, province_id, description, image, is_popular) => {
  try {
    return await locationService.createLocation(name, province_id, description, image, is_popular);
  } catch (error) {
    console.log("Create location controller ", error);
    throw error;
  }
};

const popularLocation = async (location_id, is_popular) => {
  try {
    return await locationService.popularLocation(location_id, is_popular);
  } catch (error) {
    console.log("Popular locations controller ", error);
    throw error;
  }
};

const deleteLocation = async (location_id) => {
  try {
    return await locationService.deleteLocation(location_id);
  } catch (error) {
    console.log("Delete location controller ", error);
    throw error;
  }
};

const updateDeleted = async () => {
  try {
    return await locationService.updateDeleted();
  } catch (error) {
    console.log("Update deleted controller ", error);
    throw error;
  }
};

module.exports = {
  getAllLocations,
  getLocationById,
  getLocationByProvinceId,
  createLocation,
  getAllLocations_web,
  popularLocation,
  deleteLocation, 
  updateDeleted
};
