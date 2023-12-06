const locationService = require("./LocationService");

const getAllLocations = async (page, size) => {
  try {
    return await locationService.getAllLocations(page, size);
  } catch (error) {
    console.log("Get all locations controller ", error);
    throw error;
  }
};

module.exports = {
  getAllLocations,
};
