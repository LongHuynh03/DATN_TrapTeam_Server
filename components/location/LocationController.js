const locationService = require("./LocationService");

const getAllLocations = async (page, size) => {
  try {
    return await locationService.getAllLocations(page, size);
  } catch (error) {
    console.log("Get all locations controller ", error);
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

const deleteLocation = async (location_id) => {
  try {
    return await locationService.deleteLocation(location_id);
  } catch (error) {
    console.log("Delete location controller ", error);
    throw error;
  }
};

const getLocation = async (location_id) => {
  try {
    return await locationService.getLocation(location_id);
  } catch (error) {
    console.log("Get location controller ", error);
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

module.exports = {
  getAllLocations,
  createLocation,
  deleteLocation,
  getLocation,
  popularLocation,
};
