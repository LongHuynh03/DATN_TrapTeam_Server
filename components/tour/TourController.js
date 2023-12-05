const tourService = require("./TourService");
// Lấy danh sách tour
const getAllTours = async (page, size) => {
  try {
    return await tourService.getAllTours(page, size);
  } catch (error) {
    console.log("Get all tours controller: ", error);
    throw error;
  }
};
// Lấy danh sách tuor nổi bật ở trang chủ
const getTourHighlight = async (page, size) => {
  try {
    return await tourService.getTourHighlight(page, size);
  } catch (error) {
    console.log("Lấy danh sách tour nổi bật controller: ", error);
    throw error;
  }
};

// lấy danh sách tour có chứa địa điểm phổ biến
const getTourByLocation = async (location_id) => {
  try {
    return await tourService.getTourByLocation(location_id);
  } catch (error) {
    console.log(
      "Lấy danh sách tour chứa địa điểm phổ biến controller: ",
      error
    );
    throw error;
  }
};

module.exports = {
  getAllTours,
  getTourHighlight,
  getTourByLocation,
};
