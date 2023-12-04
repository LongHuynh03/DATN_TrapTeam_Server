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
module.exports = {
  getAllTours,
  getTourHighlight
};
