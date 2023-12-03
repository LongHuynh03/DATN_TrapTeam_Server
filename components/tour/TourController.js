const tourService = require("./TourService");

const getAllTours = async (page, size) => {
  try {
    return await tourService.getAllTours(page, size);
  } catch (error) {
    console.log("Get all tours controller ", error);
    throw error;
  }
};

module.exports = {
  getAllTours,
};
